import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";
import rehypeMinify from "rehype-preset-minify";

export const mode =
	import.meta.env.MODE === "dev"
		? "dev"
		: import.meta.env.MODE === "prod"
			? "prod"
			: import.meta.env.MODE === "test"
				? "test"
				: "unknown";
if (mode === "unknown") console.warn("Unknown runtime mode");

// TODO: Replace this basic polyfill by `Object.groupBy` when it is in Node LTS.
export function groupBy<T, U extends keyof any>( // eslint-disable-line @typescript-eslint/no-explicit-any
	arr: T[],
	fn: (x: T) => U
): Record<U, T[]> {
	const obj = {} as Record<U, T[]>;
	for (const x of arr) {
		const key = fn(x);
		obj[key] ??= []; // eslint-disable-line @typescript-eslint/no-unnecessary-condition
		obj[key].push(x);
	}
	return obj;
}

export const markdownToHtml = (string: string) =>
	unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeSanitize)
		.use(rehypeMinify)
		.use(rehypeStringify)
		.processSync(string)
		.toString();
