type Length<T extends any[]> = T["length"];

type MapToTuple<T extends number, Acc extends 0[] = []> = ... 
// 2: create `MapToTuple`, which takes two generics,
// `T` & `Acc`. `Acc` will have a default value of [].
