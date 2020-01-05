/// <reference types="react-scripts" />

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

type ArgumentType<F extends Function> = F extends (arg: infer A) => any ? A : never
