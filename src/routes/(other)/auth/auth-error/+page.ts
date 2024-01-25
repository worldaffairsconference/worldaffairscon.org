import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async () => {
	throw error(401, "Unauthorized");
}) satisfies PageLoad;
