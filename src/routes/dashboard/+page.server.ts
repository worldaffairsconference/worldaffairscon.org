import { redirect, fail, error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { z } from "zod";
import { xata } from "$lib/server/xata";

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (!session?.user) throw redirect(303, "/");
	return { user: session.user };
};

const personalInformationSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	gradeLevel: z.string(),
	inPerson: z.enum(["true", "false"])
});

export const actions = {
	savePersonalInformation: async ({ request, locals: { getSession } }) => {
		const userId = (await getSession())?.user?.id;
		if (!userId) throw redirect(303, "/");
		const formData = Object.fromEntries(await request.formData());
		const parsedFormData = personalInformationSchema.safeParse(formData);
		if (!parsedFormData.success) return fail(400);
		const { firstName, lastName, gradeLevel, inPerson } =
			parsedFormData.data;
		console.log(parsedFormData.data);
		try {
			await xata.db.attendees.update(userId, {
				firstName,
				lastName,
				gradeLevel,
				inPerson: inPerson === "true"
			});
		} catch {
			throw error(500);
		}
		return { firstName, lastName, gradeLevel, inPerson };
	}
} satisfies Actions;
