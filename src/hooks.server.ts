import {
	AUTH_SECRET,
	EMAIL_FROM,
	EMAIL_SERVER_HOST,
	EMAIL_SERVER_PASSWORD,
	EMAIL_SERVER_PORT,
	EMAIL_SERVER_USER
} from "$env/static/private";
import { SvelteKitAuth } from "@auth/sveltekit";
import EmailProvider from "@auth/core/providers/email";
import nodemailer from "nodemailer";
import { renderEmail } from "$lib/server/email";
import { XataAdapter } from "$lib/server/auth/adapter";
import { xata } from "$lib/server/xata";

export const handle = SvelteKitAuth({
	adapter: XataAdapter(),
	providers: [
		EmailProvider({
			server: {
				host: EMAIL_SERVER_HOST,
				port: +EMAIL_SERVER_PORT,
				auth: {
					user: EMAIL_SERVER_USER,
					pass: EMAIL_SERVER_PASSWORD
				}
			},
			from: EMAIL_FROM,
			async sendVerificationRequest({
				identifier: email,
				url,
				provider: { server, from }
			}) {
				const transport = nodemailer.createTransport(server);
				await transport.sendMail({
					to: email,
					from,
					subject: `Sign in to your WAC account`,
					...renderEmail("magic-link", { url })
				});
			}
		})
	],
	trustHost: true,
	secret: AUTH_SECRET,
	pages: {
		verifyRequest: "/auth/auth-verify",
		error: "/auth/auth-error"
	},
	callbacks: {
		session({ session, user }) {
			return { ...session, user };
		},
		async signIn({ user }) {
			const isNewUser = user.id === user.email;

			if (!user.email) return false;

			if (isNewUser) {
				const [, domain] = user.email.split("@");
				if (!domain) return false;
				const school = await xata.db.partner_schools
					.filter({ domain })
					.getFirst();
				if (!school || !school.allowsSelfRegistration) return false;
			}

			return true;
		}
	}
});
