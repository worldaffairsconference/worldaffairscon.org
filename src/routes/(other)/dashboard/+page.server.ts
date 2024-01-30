import { redirect, fail, error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { z } from "zod";
import { xata } from "$lib/server/xata";
import { getEmailDomain } from "$lib/utils";

const getSchoolsForEmail = async (email: string) => {
	const domain = getEmailDomain(email);
	const records = await xata.db.partner_schools
		.filter({ domain })
		.select(["name"])
		.getAll();
	return records.map(({ id, name }) => ({ id, name }));
};

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (!session?.user?.email) throw redirect(303, "/");
	return {
		user: session.user,
		possibleSchools: await getSchoolsForEmail(session.user.email)
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
			gradeLevel: z.string(),
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
