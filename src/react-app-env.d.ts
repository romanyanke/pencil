/// <reference types="react-scripts" />
type ArgumentType<F extends Function> = F extends (arg: infer A) => any ? A : never
