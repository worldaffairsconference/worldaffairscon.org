import type { z } from 'zod';

export type PartialUnkown<T> = {
	[P in keyof T]?: unknown;
};

export type ZodCatchObject<T extends z.AnyZodObject> = z.ZodObject<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends z.ZodObject<infer K, any, any, any, any> ? DeepZodCatch<K> : never,
	'strip',
	z.ZodTypeAny,
	z.infer<T>,
	PartialUnkown<z.infer<T>>
>;

export type ZodCatch<T> = T extends z.AnyZodObject
	? z.ZodCatch<ZodCatchObject<T>>
	: T extends z.ZodArray<infer U, infer V>
	? z.ZodCatch<z.ZodArray<ZodCatch<U>, V>>
	: T extends z.ZodTypeAny
	? z.ZodCatch<T>
	: never;

export type DeepZodCatch<T> = {
	[P in keyof T]: ZodCatch<T[P]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ZodStrictObject = z.ZodObject<any, 'strict', any, any, any>;

export type IsValidSchemaPair<T, U> = T extends ZodStrictObject
	? U extends z.AnyZodObject
		? z.infer<T> extends z.infer<U>
			? U extends ZodCatchObject<T>
				? true
				: false
			: false
		: false
	: false;
