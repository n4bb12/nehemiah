import { Logger } from "../logger"

export type File = Promise<string>
export type Files = Promise<string[]>
export type Nothing = Promise<void>
export type Optional<T> = T | undefined
export type Maybe<T> = Promise<Optional<T>>
export type Modifier<T> = (value: T) => void | T | Optional<T> | Maybe<T>

export interface CopyTo {
  to(target: string): Nothing
}

export interface Converter<T> {
  parse(text: string): T,
  stringify(value: T): string,
}

export interface Context {
  cwd: string
  logger: Logger
}
