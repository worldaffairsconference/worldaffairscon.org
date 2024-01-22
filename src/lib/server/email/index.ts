import { render } from "@react-email/render";
import { MagicLinkEmail } from "./templates/magic-link";
import * as React from "react";

const templates = {
	"magic-link": MagicLinkEmail
} as const;
type Templates = typeof templates;

export function renderEmail<T extends keyof Templates>(
	templateName: T,
	templateProps: Templates[T] extends React.FunctionComponent<infer P>
		? P
		: never
) {
	const element = React.createElement(
		templates[templateName],
		templateProps as any // eslint-disable-line @typescript-eslint/no-explicit-any
	);
	return {
		html: render(element),
		text: render(element, { plainText: true })
	};
}
