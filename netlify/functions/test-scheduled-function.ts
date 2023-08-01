import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { schedule } from "@netlify/functions";
import { addEmailToDistributionList } from "$lib/server/zoho";

const myHandler: Handler = async (
	event: HandlerEvent,
	context: HandlerContext
) => {
	console.log("Received event:", event);
	console.log(addEmailToDistributionList);

	return {
		statusCode: 200
	};
};

const handler = schedule("@hourly", myHandler);

export { handler };
