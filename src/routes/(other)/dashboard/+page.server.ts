import { redirect, fail, error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { z } from "zod";
import { xata } from "$lib/server/xata";
import { getEmailDomain, mapGroupBy } from "$lib/utils";
import type {
	PlenariesRecord,
	SpeakersRecord
} from "$lib/server/xata.generated";
import type { SelectedPick } from "@xata.io/client";

const getSchoolsForEmail = async (email: string) => {
	const domain = getEmailDomain(email);
	const records = await xata.db.partner_schools
		.filter({ domain })
		.select(["name"])
		.getAll();
	return records.map(({ id, name }) => ({ id, name }));
};

const getPlenarySchedule = async (attendeeId: string) => {
	const [plenaries, plenaryPreferences] = await Promise.all([
		xata.db.plenaries
			.select([
				"id",
				"theme",
				"scheduleSlot.*",
				{
					name: "<-speakers.plenary",
					columns: ["id", "name", "title", "shortBio"],
					as: "speakers"
				}
			])
			.getAll(),
		xata.db.attendees_plenaries
			.filter({ attendee: attendeeId })
			.select(["plenary.id", "preferenceRank"])
			.getAll()
	]);

	const preferenceRankByPlenary = Object.fromEntries(
		plenaryPreferences.flatMap(({ plenary, preferenceRank }) =>
			plenary ? [[plenary.id, preferenceRank]] : []
		)
	);

	// TODO: Remove this if Record and Tuple value types proposal is accepted and implemented in Node LTS.
	type ScheduleSlot = NonNullable<
		SelectedPick<PlenariesRecord, ["scheduleSlot.*"]>["scheduleSlot"]
	>;
	const scheduleSlots: Record<
		string,
		{
			id: string;
			startTime: Date | null | undefined;
			endTime: Date | null | undefined;
		}
	> = {};
	const getScheduleSlotById = (scheduleSlot: ScheduleSlot) =>
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		(scheduleSlots[scheduleSlot.id] ??= {
			id: scheduleSlot.id,
			startTime: scheduleSlot.startTime,
			endTime: scheduleSlot.endTime
		});

	return Array.from(
		mapGroupBy(
			plenaries.flatMap(({ id, theme, scheduleSlot, speakers }) =>
				scheduleSlot
					? [
							{
								id,
								theme,
								scheduleSlot: getScheduleSlotById(scheduleSlot),
								speakers: (
									(speakers?.records ??
										[]) as SpeakersRecord[]
								).map(({ id, name, title, shortBio }) => ({
									id,
									name,
									title,
									shortBio
								})),
								preferenceRank:
									preferenceRankByPlenary[id] ?? Infinity
							}
						]
					: []
			),
			({ scheduleSlot }) => scheduleSlot
		).entries()
	).map(([scheduleSlot, plenaries]) => ({
		...scheduleSlot,
		plenaries: plenaries.map(
			({ scheduleSlot: _scheduleSlot, ...plenary }) => plenary
		)
	}));
};

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (!session?.user?.email) throw redirect(303, "/");
	const { isPlenarySelectionOpen } = await xata.db.general_settings
		.filter("active", true)
		.getFirstOrThrow();
	const [plenarySchedule, possibleSchools] = await Promise.all([
		isPlenarySelectionOpen
			? getPlenarySchedule(session.user.id)
			: undefined,
		getSchoolsForEmail(session.user.email)
	]);
	return {
		user: session.user,
		possibleSchools: [...possibleSchools],
		plenarySchedule: plenarySchedule?.map(({ plenaries, ...schedule }) => ({
			...schedule,
			plenaries: plenaries.sort(
				(a, b) =>
					a.preferenceRank - b.preferenceRank ||
					(a.theme && b.theme ? a.theme.localeCompare(b.theme) : 0)
			)
		}))
	};
};

export const actions = {
	default: async ({ request, locals: { getSession } }) => {
		const { id: userId, email: userEmail } =
			(await getSession())?.user ?? {};
		if (!userId || !userEmail) throw redirect(303, "/");

		const { isPlenarySelectionOpen } = await xata.db.general_settings
			.filter("active", true)
			.getFirstOrThrow();
		const plenarySchedule = isPlenarySelectionOpen
			? await xata.db.schedule_slots
					.select([
						"startTime",
						"endTime",
						{
							name: "<-plenaries.scheduleSlot",
							columns: [
								"id",
								"speakerName",
								"speakerTitle",
								"description",
								"theme"
							],
							as: "plenaries"
						}
					])
					.getAll()
			: [];
		const plenaryIds = plenarySchedule
			.flatMap(({ plenaries }) => plenaries?.records ?? [])
			.map(({ id }) => id);

		const booleanStringSchema = z
			.enum(["true", "false"])
			.transform((v) => v === "true");
		const schema = z.object({
			needsLunch: booleanStringSchema,
			dietaryRestrictions: z.string().trim(),
			firstName: z.string().trim(),
			lastName: z.string().trim(),
			school: z
				.string()
				.refine(async (school) =>
					(await getSchoolsForEmail(userEmail))
						.map(({ id }) => id)
						.includes(school)
				),
			gradeLevel: z.enum(["other", "7", "8", "9", "10", "11", "12"]),
			inPerson: booleanStringSchema,
			rankedPlenaries: z
				.string()
				.transform((val, ctx) => {
					try {
						return JSON.parse(val);
					} catch {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: "Invalid JSON"
						});
					}
				})
				.pipe(
					z
						.array(z.string())
						.refine(
							(arr) =>
								arr.every((id) => plenaryIds.includes(id)) &&
								plenaryIds.every((id) => arr.includes(id))
						)
				)
		});

		const parsedFormData = await schema.safeParseAsync(
			Object.fromEntries(await request.formData())
		);
		if (!parsedFormData.success) return fail(400);
		const { rankedPlenaries, ...attendeeAttributes } = parsedFormData.data;

		try {
			await xata.db.attendees.update(userId, attendeeAttributes);
			if (isPlenarySelectionOpen) {
				await xata.db.attendees_plenaries.delete(
					await xata.db.attendees_plenaries
						.filter({ attendee: userId })
						.getAll()
				);
				await xata.db.attendees_plenaries.create(
					plenarySchedule.flatMap(
						({ plenaries }) =>
							plenaries?.records
								.sort(
									(a, b) =>
										rankedPlenaries.indexOf(a.id) -
										rankedPlenaries.indexOf(b.id)
								)
								.map(({ id }, preferenceRank) => ({
									plenary: id,
									attendee: userId,
									preferenceRank
								})) ?? []
					)
				);
			}
		} catch {
			throw error(500);
		}
	}
} satisfies Actions;
