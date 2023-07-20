import { faker } from "@faker-js/faker";
import { rest } from "msw";
import { setupServer } from "msw/node";

import {
	ZOHO_NEWSLETTER_DISTRIBUTION_LIST_ID,
	ZOHO_ORGANIZATION_ID
} from "$env/static/private";

import { addEmailToDistributionList } from "./zoho";

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("mail distribution lists api", () => {
	it("should return success with new email", async () => {
		server.use(
			rest.put(
				`https://mail.zoho.com/api/organization/${ZOHO_ORGANIZATION_ID}/groups/${ZOHO_NEWSLETTER_DISTRIBUTION_LIST_ID}`,
				(_, res, ctx) =>
					res(
						ctx.status(200),
						ctx.json({
							status: {
								code: 200,
								description: "success"
							}
						})
					)
			)
		);
		expect(
			await addEmailToDistributionList("uccwac@gmail.com", "newsletter")
		).toStrictEqual({
			success: true,
			message: "added"
		});
	});

	it("should return success with existing email", async () => {
		server.use(
			rest.put(
				`https://mail.zoho.com/api/organization/${ZOHO_ORGANIZATION_ID}/groups/${ZOHO_NEWSLETTER_DISTRIBUTION_LIST_ID}`,
				(_, res, ctx) =>
					res(
						ctx.status(200),
						ctx.json({
							status: {
								code: 200,
								description: "success"
							},
							data: [
								{
									"uccwac@gmail.com": "Already Exist"
								}
							]
						})
					)
			)
		);
		expect(
			await addEmailToDistributionList("uccwac@gmail.com", "newsletter")
		).toStrictEqual({
			success: true,
			message: "alreadyAdded"
		});
	});

	it("should return error with invalid email", async () => {
		server.use(
			rest.put(
				`https://mail.zoho.com/api/organization/${ZOHO_ORGANIZATION_ID}/groups/${ZOHO_NEWSLETTER_DISTRIBUTION_LIST_ID}`,
				(_, res, ctx) =>
					res(
						ctx.status(400),
						ctx.json({
							data: {
								errorCode: "PATTERN_NOT_MATCHED",
								moreInfo:
									"zoho\\x2Dinputstream\\x20Input\\x20does\\x20not\\x20match\\x20the\\x20given\\x20pattern"
							},
							status: {
								code: 400,
								description: "Invalid Input"
							}
						})
					)
			)
		);
		expect(
			await addEmailToDistributionList("uccwac", "newsletter")
		).toStrictEqual({
			success: false,
			message: "invalidEmail"
		});
	});

	it("should return error with empty email", async () => {
		server.use(
			rest.put(
				`https://mail.zoho.com/api/organization/${ZOHO_ORGANIZATION_ID}/groups/${ZOHO_NEWSLETTER_DISTRIBUTION_LIST_ID}`,
				(_, res, ctx) =>
					res(
						ctx.status(200),
						ctx.json({
							status: { code: 200, description: "success" },
							data: [{ "": "Invalid member" }]
						})
					)
			)
		);
		expect(
			await addEmailToDistributionList("", "newsletter")
		).toStrictEqual({
			success: false,
			message: "invalidEmail"
		});
	});

	it("should not throw on unknown api response", async () => {
		server.use(
			rest.put(
				`https://mail.zoho.com/api/organization/${ZOHO_ORGANIZATION_ID}/groups/${ZOHO_NEWSLETTER_DISTRIBUTION_LIST_ID}`,
				(_, res, ctx) => res(ctx.status(400), ctx.json({}))
			)
		);
		const error = console.error;
		console.error = () => {};
		expect(
			await addEmailToDistributionList("uccwac@gmail.com", "newsletter")
		).toStrictEqual({
			success: false,
			message: "unknownError"
		});
		console.error = error;
	});

	it("should be able to refresh the access token", async () => {
		const accessToken = faker.internet.password();
		server.use(
			rest.put(
				`https://mail.zoho.com/api/organization/${ZOHO_ORGANIZATION_ID}/groups/${ZOHO_NEWSLETTER_DISTRIBUTION_LIST_ID}`,
				(req, res, ctx) => {
					if (
						req.headers.get("Authorization") ===
						`Zoho-oauthtoken ${accessToken}`
					)
						return res(
							ctx.status(200),
							ctx.json({
								status: {
									code: 200,
									description: "success"
								}
							})
						);
					else
						return res(
							ctx.status(400),
							ctx.json({
								data: {
									errorCode: "INVALID_OAUTHTOKEN"
								},
								status: {
									code: 404,
									description: "Invalid Input"
								}
							})
						);
				}
			),
			rest.post(
				"https://accounts.zoho.com/oauth/v2/token",
				(_, res, ctx) =>
					res(
						ctx.status(200),
						ctx.json({
							access_token: accessToken,
							api_domain: "https://www.zohoapis.com",
							token_type: "Bearer",
							expires_in: 3600
						})
					)
			)
		);
		expect(
			await addEmailToDistributionList("uccwac@gmail.com", "newsletter")
		).toStrictEqual({
			success: true,
			message: "added"
		});
	});

	it("should not throw if the access token cannot be refreshed", async () => {
		server.use(
			rest.put(
				`https://mail.zoho.com/api/organization/${ZOHO_ORGANIZATION_ID}/groups/${ZOHO_NEWSLETTER_DISTRIBUTION_LIST_ID}`,
				(_, res, ctx) =>
					res(
						ctx.status(400),
						ctx.json({
							data: {
								errorCode: "INVALID_OAUTHTOKEN"
							},
							status: {
								code: 404,
								description: "Invalid Input"
							}
						})
					)
			),
			rest.post(
				"https://accounts.zoho.com/oauth/v2/token",
				(_, res, ctx) => res(ctx.status(200), ctx.json({}))
			)
		);
		const error = console.error;
		console.error = () => {};
		expect(
			await addEmailToDistributionList("uccwac@gmail.com", "newsletter")
		).toStrictEqual({
			success: false,
			message: "unknownError"
		});
		console.error = error;
	});
});
