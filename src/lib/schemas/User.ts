import { assert } from "tsafe";
import { z } from "zod";

import type { IsValidSchemaPair } from "$lib/schemas/types";

export const User = z
	.object({
		email: z.string().email(),
		name: z.string(),
		registeredToMailingList: z.boolean()
	})
	.strict();

export const UserParse = z.object({
	email: z.string().catch("invalid@email.invalid"), // Should be guaranteed not to exist by https://www.rfc-editor.org/rfc/rfc6761
	name: z.string().catch("John Doe"),
	registeredToMailingList: z.boolean().catch(false)
});

assert<IsValidSchemaPair<typeof User, typeof UserParse>>();

export type User = z.infer<typeof User>;
