import {
	ZOHO_NEWSLETTER_DISTRIBUTION_LIST_ID,
	ZOHO_OAUTH_ID,
	ZOHO_OAUTH_SECRET,
	ZOHO_ORGANIZATION_ID,
	ZOHO_REFRESH_TOKEN
} from "$env/static/private";

const distributionLists = {
	newsletter: ZOHO_NEWSLETTER_DISTRIBUTION_LIST_ID
} as const;

let accessToken: string;

async function refreshAccessToken() {
	const res = await fetch(
		"https://accounts.zoho.com/oauth/v2/token?" +
			new URLSearchParams({
				client_id: ZOHO_OAUTH_ID,
				client_secret: ZOHO_OAUTH_SECRET,
				refresh_token: ZOHO_REFRESH_TOKEN,
				grant_type: "refresh_token"
			}),
		{
			method: "POST"
		}
	);
	const data = await res.json();
	// Don't use `if (res.status === 200)` or `if (res.ok)` because Zoho returns 200 even when there's an error
	if (!data?.error && data.access_token) {
		accessToken = data.access_token;
	} else throw new Error(JSON.stringify(data, null, 2));
}

export async function addEmailToDistributionList(
	email: string,
	list: keyof typeof distributionLists,
	retryCount = 0
): Promise<
	| {
			success: true;
			message: "added" | "alreadyAdded";
	  }
	| { success: false; message: "invalidEmail" | "unknownError" }
> {
	if (retryCount > 3) return { success: false, message: "unknownError" };

	if (!email.trim()) return { success: false, message: "invalidEmail" };

	try {
		const res = await fetch(
			`https://mail.zoho.com/api/organization/${ZOHO_ORGANIZATION_ID}/groups/${distributionLists[list]}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Zoho-oauthtoken ${accessToken}`
				},
				body: JSON.stringify({
					mailGroupMemberList: [
						{
							memberEmailId: email,
							role: "member"
						}
					],
					mode: "addMailGroupMember"
				})
			}
		);

		const data = await res.json();
		if (res.status === 200)
			return {
				success: true,
				message: Object.values(data?.data?.[0] ?? {}).includes(
					"Already Exist"
				)
					? "alreadyAdded"
					: "added"
			};

		if (data.data?.errorCode === "INVALID_OAUTHTOKEN") {
			await refreshAccessToken();
			return await addEmailToDistributionList(
				email,
				list,
				retryCount + 1
			);
		} else if (data.data?.errorCode === "PATTERN_NOT_MATCHED")
			return { success: false, message: "invalidEmail" };
		else throw new Error(JSON.stringify(data, null, 2));
	} catch (error) {
		if (error instanceof Error)
			error.message = `Unkown Zoho API Error: ${error.message}`;
		console.error(error);
		return { success: false, message: "unknownError" };
	}
}

// export async function getEmailStatusForDistributionList(
// 	email: string,
// 	list: keyof typeof distributionLists
// ): Promise<
// 	| { success: true; status: "active" | "unconfirmed" | "unkown" }
// 	| { success: false; message: "invalidEmail" | "unknownError" }
// > {
// 	if (!email.trim()) return { success: false, message: "invalidEmail" };

// 	try {
// 		const res = await fetch(
// 			`https://mail.zoho.com/api/organization/${ZOHO_ORGANIZATION_ID}/groups/${distributionLists[list]}`,
// 			{
// 				method: "GET",
// 				headers: {
// 					Authorization: `Zoho-oauthtoken ${accessToken}`
// 				}
// 			}
// 		);

//         const data = await res.json()
//         if (res.status === 200) return {
//             success: true,
//             status: data.data.mailGroupMemberList.find(m => m.memberEmailId === email)
//         }
// 	} catch (error) {
// 		if (error instanceof Error)
// 			error.message = `Unkown Zoho API Error: ${error.message}`;
// 		console.error(error);
// 		return { success: false, message: "unknownError" };
// 	}
// }
