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

export function MagicLinkEmail({ url, token }: { url: string; token: string }) {
	return (
		/* @ts-expect-error There seems to be a typing bug in @react-email/components */
		<Tailwind config={tailwindConfig}>
			<Html>
				<Head />

				<Preview>Your magic sign in link for WAC!</Preview>

				<Body className="bg-zinc-900 py-14 px-10 text-center">
					<Img
						src="https://i.imgur.com/mPTzcmz.png"
						alt="WAC Logo"
						className="mx-auto"
						height={60}
					/>
					<Text className="text-3xl font-bold text-white">
						Complete your sign in to WAC!
					</Text>
					<Text className="text-zinc-400">
						Here is the sign in link you requested. Open it in a web
						browser to access your World Affairs Conference account.
					</Text>
					<Button
						href={url}
						style={{
							backgroundImage:
								"linear-gradient(to right, #4ea59c, #52a7dc)"
						}}
						className="rounded-full px-9 py-3 mx-auto text-white"
					>
						Sign In
					</Button>
					<Text className="text-zinc-400 italic">
						Unable to open the link? Copy and paste the following
						token: {token}
					</Text>
				</Body>
			</Html>
		</Tailwind>
	);
}

export default MagicLinkEmail;
