import { AUTH_SECRET, EMAIL_FROM } from "$env/static/private";
import { SvelteKitAuth } from "@auth/sveltekit";
import { renderEmail } from "$lib/server/email";
import { XataAdapter } from "$lib/server/auth/adapter";
import { xata } from "$lib/server/xata";
import { MAILGUN_DOMAIN, MAILGUN_API_KEY } from "$env/static/private";
import type { SendVerificationRequestParams } from "@auth/core/providers";

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
				body.append("subject", "Sign in to your WAC account");
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
