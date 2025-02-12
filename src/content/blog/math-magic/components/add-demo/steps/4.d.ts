// @noErrors
type Length<T extends any[]> = T["length"];

type MapToTuple<T extends number, Acc extends 0[] = []> = 
    Length<Acc> extends T
	    ? Acc
	    : MapToTuple<T, [...Acc, 0]>;
// 4: ...otherwise, we re-use `MapToTuple`, passing in `T` again.
// copy `Acc` and append a new value to it, increasing its length.