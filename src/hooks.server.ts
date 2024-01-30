import { AUTH_SECRET, EMAIL_FROM } from "$env/static/private";
import { SvelteKitAuth } from "@auth/sveltekit";
import { renderEmail } from "$lib/server/email";
import { XataAdapter } from "$lib/server/auth/adapter";
import { xata } from "$lib/server/xata";
import { MAILGUN_DOMAIN, MAILGUN_API_KEY } from "$env/static/private";
import type { SendVerificationRequestParams } from "@auth/core/providers";
import { getEmailDomain } from "$lib/utils";

export const handle = SvelteKitAuth({
	adapter: XataAdapter(),
	providers: [
		{
			id: "magic-link",
			// @ts-expect-error This seems to be a bug in the @auth/core types as this is exactly what is recommended by the documentation — https://authjs.dev/guides/providers/email-http
			type: "email",
			name: "Email",
			async sendVerificationRequest({
				identifier: email,
				url
			}: SendVerificationRequestParams): Promise<void> {
				const body = new FormData();
				body.append("from", EMAIL_FROM);
				body.append("to", email);
				const formattedDate = new Date()
					.toLocaleString("en-ca", { hourCycle: "h23" })
					.replace(", ", " — ");
				body.append(
					"subject",
					`Sign in to your WAC account (${formattedDate})`
				);
				const { html, text } = renderEmail("magic-link", { url });
				body.append("html", html);
				body.append("text", text);
				const headers = new Headers();
				headers.set(
					"Authorization",
					"Basic " + btoa(`api:${MAILGUN_API_KEY}`)
				);
				await fetch(
					`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
					{
						method: "post",
						body,
						headers
					}
				);
			}
		}
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

			const domain = getEmailDomain(user.email);
			const schools = await xata.db.partner_schools
				.filter({ domain, allowsSelfRegistration: true })
				.getAll();

			if (isNewUser) {
				if (schools.length === 0) return false;
			} else if (schools.length === 1 && schools[0]) {
				await xata.db.attendees.update(user.id, {
					school: schools[0].id
				});
			}

			return true;
		}
	}
});
