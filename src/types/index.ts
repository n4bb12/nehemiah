export * from "./Context"

export type File = Promise<string>
export type Files = Promise<string[]>
export type Nothing = Promise<void>
export type Optional<T> = T | undefined
export type Maybe<T> = Promise<Optional<T>>
export type Modifier<T> = (value: T) => void | T | Optional<T> | Maybe<T>
