namespace Helpers {
  export type MakeArrayWithLengthByNumber<
    A extends number,
    TResult extends number[] = []
  > = TResult["length"] extends A
    ? TResult
    : MakeArrayWithLengthByNumber<A, [...TResult, 1]>;

  export type Compare<
    A extends number,
    B extends number
  > = MakeArrayWithLengthByNumber<A> extends [
    ...MakeArrayWithLengthByNumber<B>,
    ...number[]
  ]
    ? true
    : false;

  export type PlusOne<N extends number> = [
    ...MakeArrayWithLengthByNumber<N>,
    1
  ]["length"];

  export type GetMax<A extends number, B extends number> = Compare<
    A,
    B
  > extends true
    ? A
    : B;

  export type GetTodosIds<
    List extends Todo[],
    Union = Utils.UnionToTuple<List[number]["id"]>
  > = Union extends number[] ? Union : [0];

  export type GetMaxId<
    Id extends number[],
    TRes extends number = 1
  > = Id extends [infer First, ...infer Rest]
    ? First extends number
      ? Rest extends number[]
        ? GetMaxId<Rest, GetMax<First, TRes>>
        : TRes
      : TRes
    : TRes;

  export type GenerateId<List extends Todo[]> = PlusOne<
    GetMaxId<GetTodosIds<List>>
  >;

  type NumToTupleByProperty<N, Prop extends string> = Prop extends keyof N
    ? MakeArrayWithLengthByNumber<N[Prop] extends number ? N[Prop] : never>
    : [];

  type GreaterByPropery<A, B, By extends string> = NumToTupleByProperty<A, By> extends [
    ...NumToTupleByProperty<B, By>,
    ...any[]
  ]
    ? true
    : false;

  export type Bubble<A, Desc, By extends string> = A extends [
    infer F,
    infer S,
    ...infer R
  ]
    ? GreaterByPropery<F, S, By> extends Desc
      ? [F, ...Bubble<[S, ...R], Desc, By>]
      : [S, ...Bubble<[F, ...R], Desc, By>]
    : A;

  export type CreateTodo<
    Text extends string,
    Id extends TodoID
  > = Utils.ExtendDeep<{
    id: Id;
    title: Text;
    checked: false;
  }>;
}
