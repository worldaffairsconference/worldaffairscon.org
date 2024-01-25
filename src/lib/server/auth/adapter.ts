// Originally from https://github.com/nextauthjs/next-auth/blob/main/packages/adapter-xata/src/index.ts

// ISC License

// Copyright (c) 2022-2023, Balázs Orbán

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.

// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

import type { Adapter } from "@auth/core/adapters";
import { xata as client } from "../xata";
import type { Attendees } from "../xata.generated";

declare module "@auth/core/types" {
	interface User extends Attendees {}
}

export function XataAdapter(): Adapter {
	return {
		// @ts-expect-error Error is inherited from the original source code
		// TODO: Refactor to ensure type safety
		async createUser(user) {
			const newUser = await client.db.attendees.create(user);
			return newUser;
		},
		// @ts-expect-error Error is inherited from the original source code
		// TODO: Refactor to ensure type safety
		async getUser(id) {
			const user = await client.db.attendees.filter({ id }).getFirst();
			return user ?? null;
		},
		// @ts-expect-error Error is inherited from the original source code
		// TODO: Refactor to ensure type safety
		async getUserByEmail(email) {
			const user = await client.db.attendees.filter({ email }).getFirst();
			return user ?? null;
		},
		// @ts-expect-error Error is inherited from the original source code
		// TODO: Refactor to ensure type safety
		async getUserByAccount({ providerAccountId, provider }) {
			const result = await client.db.auth_users_accounts
				.select(["user.*"])
				.filter({
					"account.providerAccountId": providerAccountId,
					"account.provider": provider
				})
				.getFirst();
			const user = result?.user;
			return user ?? null;
		},
		// @ts-expect-error Error is inherited from the original source code
		// TODO: Refactor to ensure type safety
		async updateUser(user) {
			const result = await client.db.attendees.update(user.id!, user);
			return (
				result ?? {
					...user,
					id: user.id!,
					emailVerified: user.emailVerified ?? null
				}
			);
		},
		// @ts-expect-error Error is inherited from the original source code
		// TODO: Refactor to ensure type safety
		async deleteUser(id) {
			return await client.db.attendees.delete(id);
		},
		async linkAccount(initialAccount) {
			const { userId, ...account } = initialAccount;
			const newXataAccount = await client.db.auth_accounts.create({
				...account,
				user: { id: userId }
			});
			await client.db.auth_users_accounts.create({
				user: { id: userId },
				account: { id: newXataAccount.id }
			});
		},
		// @ts-expect-error Error is inherited from the original source code
		// TODO: Refactor to ensure type safety
		async unlinkAccount({ providerAccountId, provider }) {
			/**
			 * @todo refactor this when we support DELETE WHERE.
			 */
			const connectedAccount = await client.db.auth_users_accounts
				.filter({
					"account.providerAccountId": providerAccountId,
					"account.provider": provider
				})
				.getFirst();

			if (!connectedAccount) {
				return;
			}
			return await client.db.auth_users_accounts.delete(
				connectedAccount.id
			);
		},
		// @ts-expect-error Error is inherited from the original source code
		// TODO: Refactor to ensure type safety
		async createSession(initialSession) {
			const { userId, ...session } = initialSession;
			const newXataSession = await client.db.auth_sessions.create({
				...session,
				user: { id: userId }
			});
			await client.db.auth_users_sessions.create({
				user: { id: userId },
				session: { id: newXataSession.id }
			});
			return { ...session, ...newXataSession, userId };
		},
		// @ts-expect-error Error is inherited from the original source code
		// TODO: Refactor to ensure type safety
		async getSessionAndUser(sessionToken) {
			const result = await client.db.auth_users_sessions
				.select(["user.*", "session.*"])
				.filter({ "session.sessionToken": sessionToken })
				.getFirst();
			if (!result?.session || !result.user) {
				return null;
			}

			return {
				session: {
					...result.session,
					sessionToken: result.session.sessionToken!,
					expires: result.session.expires!,
					userId: result.user.id
				},
				user: {
					...result.user,
					emailVerified: result.user.emailVerified ?? null
				}
			};
		},
		async updateSession({ sessionToken, ...data }) {
			const session = await client.db.auth_sessions
				.filter({ sessionToken })
				.getFirst();
			if (!session) {
				return null;
			}

			await client.db.auth_sessions.update({ ...session, ...data });
			return {
				...session,
				sessionToken,
				userId: data.userId!,
				expires: data.expires!
			};
		},

		async deleteSession(sessionToken) {
			/**
			 * @todo refactor this when we support DELETE WHERE.
			 */
			const session = await client.db.auth_sessions
				.filter({ sessionToken })
				.getFirst();
			if (!session) {
				return;
			}
			const connectedSession = await client.db.auth_users_sessions
				.filter({ "session.sessionToken": sessionToken })
				.getFirst();
			if (!connectedSession) {
				return;
			}
			await client.db.auth_sessions.delete(session.id);
			await client.db.auth_users_sessions.delete(connectedSession.id);
		},
		async createVerificationToken(token) {
			await client.db.auth_verification_tokens.create({
				expires: token.expires,
				identifier: token.identifier,
				token: token.token
			});
			return token;
		},
		async useVerificationToken(token) {
			/**
			 * @todo refactor this when we support DELETE WHERE.
			 */
			const xataToken = await client.db.auth_verification_tokens
				.filter({ identifier: token.identifier, token: token.token })
				.getFirst();
			if (!xataToken) {
				return null;
			}
			await client.db.auth_verification_tokens.delete(xataToken.id);
			return { ...token, expires: new Date() };
		}
	};
}
