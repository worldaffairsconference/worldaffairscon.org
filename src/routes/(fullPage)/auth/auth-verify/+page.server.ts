import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent, cookies }) => {
	const { session } = await parent();
	if (session?.user) throw redirect(303, "/dashboard");
	return { callbackUrl: cookies.get("authjs.callback-url") ?? "/" };
};
