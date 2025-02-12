// @noErrors
type Length<T extends any[]> = T["length"];
type MapToTuple<T extends number, Acc extends 0[] = []> = Length<Acc> extends T
	? Acc
	: MapToTuple<T, [...Acc, 0]>;
type Add<A extends number, B extends number> = Length<[...MapToTuple<A>, ...MapToTuple<B>]>;
// ---cut---
type Fibonacci<
	N extends number,
	Sum extends number = 1,
	Prev extends number = 0,
	Counter extends number = 1
> = Counter extends N 
	? Sum 
	: Fibonacci<N, Add<Sum, Prev>, Sum, 