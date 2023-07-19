import { type Actions, fail } from "@sveltejs/kit";

import { addEmailToDistributionList } from "$lib/server/zoho";

export const actions = {
	getNotified: async ({ request }) => {
		const data = await request.formData();
		const email = data.get("email")?.toString() ?? "";
		const res = await addEmailToDistributionList(email, "newsletter");

		if (!res.success) {
			switch (res.message) {
				case "invalidEmail":
					return fail(400, res);
				case "unknownError":
					return fail(500, res);
			}
		}

		return res;
	}
} satisfies Actions;
