import {
	Head,
	Html,
	Preview,
	Body,
	Text,
	Button,
	Tailwind,
	Img
} from "@react-email/components";
import * as React from "react";
import tailwindConfig from "../../../../../tailwind.config.js";

export function MagicLinkEmail({ url }: { url: string }) {
	return (
		<Html>
			<Head />
			<Preview>Your magic sign in link for WAC!</Preview>
			<Tailwind config={tailwindConfig}>
				<Body className="bg-zinc-900 p-8 text-center">
					<Img
						src="https://deploy-preview-179--worldaffairscon.netlify.app/emails/logo.png"
						alt="WAC Logo"
						className="mx-auto"
						height={50}
					/>
					<Text className="text-white text-balance">
						Here is the sign in link you requested. Open it in a web
						browser to access your World Affairs Conference account.
					</Text>
					<Button
						href={url}
						className="bg-primary rounded-lg px-6 py-2.5 text-white mx-auto"
					>
						Sign In
					</Button>
				</Body>
			</Tailwind>
		</Html>
	);
}

export default MagicLinkEmail;
