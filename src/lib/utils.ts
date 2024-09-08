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
export function groupBy<T>(list: T[], keyGetter: (item: T) => string) {
    return list.reduce((result, currentValue) => {
        const key = keyGetter(currentValue);
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(currentValue);
        return result;
    }, {} as { [key: string]: T[] });
}

// TODO: Replace this basic polyfill by `Map.groupBy` when it is in Node LTS.
export function mapGroupBy<T, U>(arr: T[], fn: (x: T) => U): Map<U, T[]> {
	const obj = new Map<U, T[]>();
	for (const x of arr) {
		const key = fn(x);
		if (!obj.has(key)) {
			obj.set(key, []);
		}
		obj.get(key)?.push(x);
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

// TODO: Refactor to use a more robust solution
export const getEmailDomain = (email: string) =>
	email.split("@").pop() as string;
