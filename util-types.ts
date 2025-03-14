namespace Utils {
  export type ExtendDeep<T> = T extends object
    ? T extends infer O
      ? { [K in keyof O]: ExtendDeep<O[K]> }
      : never
    : T;

  export type UnionToFn<T extends number> = (
    T extends any ? (arg: () => T) => any : never
  ) extends (arg: infer R) => any
    ? R
    : never;

  export type UnionToTuple<T extends number> =
    UnionToFn<T> extends () => infer R
      ? R extends number
        ? [...UnionToTuple<Exclude<T, R>>, R]
        : []
      : [];

  export type ToggleBoolean<T extends boolean> = T extends true ? false : true;

  export type Merge<T, K> = Omit<T, keyof K> & K;
}
