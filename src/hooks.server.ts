import {
	AUTH_SECRET,
	EMAIL_FROM,
	EMAIL_SERVER_HOST,
	EMAIL_SERVER_PASSWORD,
	EMAIL_SERVER_PORT,
	EMAIL_SERVER_USER
} from "$env/static/private";
import { xata } from "$lib/server/xata";
import { SvelteKitAuth } from "@auth/sveltekit";
import EmailProvider from "@auth/core/providers/email";
import { XataAdapter } from "@auth/xata-adapter";

export const handle = SvelteKitAuth({
	adapter: XataAdapter(xata),
	providers: [
		EmailProvider({
			server: {
				host: EMAIL_SERVER_HOST,
				port: EMAIL_SERVER_PORT,
				auth: {
					user: EMAIL_SERVER_USER,
					pass: EMAIL_SERVER_PASSWORD
				}
			},
			from: EMAIL_FROM
		})
	],
	trustHost: true,
	secret: AUTH_SECRET
	// pages: {

	// },
	// callbacks: {
	// 	async session(session) {
	// 		if (!session) return;
	// 		const user = await xata.db.nextauth_users
	// 			.filter("id", session.user.id)
	// 			.getFirstOrThrow();
	// 		return {
	// 			session: {
	// 				user: {
	// 					...session.user,
	// 					...user
	// 				}
	// 			}
	// 		};
	// 	}
	// }
});
