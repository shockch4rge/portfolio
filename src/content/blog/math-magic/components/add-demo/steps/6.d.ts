// @noErrors
type Length<T extends any[]> = T["length"];

type MapToTuple<T extends number, Acc extends 0[] = []> = 
    Length<Acc> extends T
    	? Acc
	    : MapToTuple<T, [...Acc, 0]>;

type Add<A extends number, B extends number> =
    Length<[...MapToTuple<A>, ...MapToTuple<B>]>
// 6. finally, get the length of `A` & `B` wrapped with `MapToTuple`
// and concatenate them together
