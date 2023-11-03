import { XATA_API_KEY, XATA_BRANCH } from "$env/static/private";
import { XataClient } from "./xata.generated";

export const xata = new XataClient({
	branch: XATA_BRANCH,
	apiKey: XATA_API_KEY
});
