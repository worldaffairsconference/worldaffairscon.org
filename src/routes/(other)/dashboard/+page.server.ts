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
		possibleSchools,
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

const booleanStringSchema = z.enum(["true", "false"]);

const lunchOptionsSchema = z.object({
	needsLunch: booleanStringSchema,
	dietaryRestrictions: z.string()
});

export const actions = {
	savePersonalInformation: async ({ request, locals: { getSession } }) => {
		const { id: userId, email: userEmail } =
			(await getSession())?.user ?? {};
		if (!userId || !userEmail) throw redirect(303, "/");

		const schema = z.object({
			firstName: z.string(),
			lastName: z.string(),
			school: z
				.string()
				.refine(async (school) =>
					(await getSchoolsForEmail(userEmail))
						.map(({ id }) => id)
						.includes(school)
				),
			gradeLevel: z.enum(["other", "7", "8", "9", "10", "11", "12"]),
			inPerson: booleanStringSchema
		});

		const formData = Object.fromEntries(await request.formData());
		const parsedFormData = await schema.safeParseAsync(formData);
		if (!parsedFormData.success) return fail(400);
		const { firstName, lastName, gradeLevel, inPerson, school } =
			parsedFormData.data;
		try {
			await xata.db.attendees.update(userId, {
				firstName,
				lastName,
				gradeLevel,
				school,
				inPerson: inPerson === "true"
			});
		} catch {
			throw error(500);
		}
		return { firstName, lastName, gradeLevel, inPerson, school };
	},
	saveLunchOptions: async ({ request, locals: { getSession } }) => {
		const userId = (await getSession())?.user?.id;
		if (!userId) throw redirect(303, "/");
		const formData = Object.fromEntries(await request.formData());
		const parsedFormData = lunchOptionsSchema.safeParse(formData);
		if (!parsedFormData.success) return fail(400);
		const { needsLunch, dietaryRestrictions } = parsedFormData.data;
		try {
			await xata.db.attendees.update(userId, {
				needsLunch: needsLunch === "true",
				dietaryRestrictions
			});
		} catch {
			throw error(500);
		}
		return { needsLunch, dietaryRestrictions };
	}
} satisfies Actions;
