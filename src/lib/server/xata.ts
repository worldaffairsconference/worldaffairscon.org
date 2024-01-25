import { env } from "$env/dynamic/private";
import { XataClient } from "./xata.generated";

export const xata = new XataClient({
	branch: env.XATA_BRANCH,
	apiKey: env.XATA_API_KEY
});
