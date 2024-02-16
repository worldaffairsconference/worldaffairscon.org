import { redirect, fail, error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { z } from "zod";
import { xata } from "$lib/server/xata";
import { getEmailDomain } from "$lib/utils";
import type { PlenariesRecord } from "$lib/server/xata.generated";

const getSchoolsForEmail = async (email: string) => {
	const domain = getEmailDomain(email);
	const records = await xata.db.partner_schools
		.filter({ domain })
		.select(["name"])
		.getAll();
	return records.map(({ id, name }) => ({ id, name }));
};

const getPlenarySchedule = async (attendeeId: string) => {
	const [scheduleSlots, plenaryPreferences] = await Promise.all([
		xata.db.schedule_slots
			.select([
				"startTime",
				"endTime",
				{
					name: "<-plenaries.scheduleSlot",
					columns: ["id", "speaker", "description"],
					as: "plenaries"
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
			plenary
				? [
						[plenary.id, preferenceRank] as [
							string,
							number | null | undefined
						]
					]
				: []
		)
	);

	return scheduleSlots.map(({ startTime, endTime, plenaries }) => ({
		startTime,
		endTime,
		plenaries: ((plenaries?.records ?? []) as PlenariesRecord[]).map(
			({ id, speaker, description }) => ({
				id,
				speaker,
				description,
				preferenceRank: preferenceRankByPlenary[id] ?? Infinity
			})
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
					(a.speaker && b.speaker
						? a.speaker.localeCompare(b.speaker)
						: 0)
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
							columns: ["id", "speaker", "description"],
							as: "plenaries"
						}
					])
					.getAll()
			: [];
		const plenaryIds = plenarySchedule
			.flatMap(({ plenaries }) => plenaries?.records ?? [])
			.map(({ id }) => id);

		const schema = z.object({
			needsLunch: z.coerce.boolean(),
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
			inPerson: z.coerce.boolean(),
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
