import { assert, type Equals } from "tsafe";

export type TupleOfLength<
	T,
	L extends number,
	U extends T[] = []
> = U["length"] extends L ? U : TupleOfLength<T, L, [...U, T]>;

assert<Equals<TupleOfLength<boolean, 3>, [boolean, boolean, boolean]>>();
assert<Equals<TupleOfLength<number, 2>, [number, number]>>();
assert<Equals<TupleOfLength<"🚀", 4>, ["🚀", "🚀", "🚀", "🚀"]>>();
