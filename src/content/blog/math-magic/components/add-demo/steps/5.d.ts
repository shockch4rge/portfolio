type Length<T extends any[]> = T["length"];

type MapToTuple<T extends number, Acc extends 0[] = []> = 
    Length<Acc> extends T
    	? Acc
	    : MapToTuple<T, [...Acc, 0]>;

type Add<A extends number, B extends number> = ...
// 5. create the `Add` type, taking in two number inputs, A & B.
