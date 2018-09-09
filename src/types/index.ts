import { Logger } from "../logger"

export type File = Promise<string>
export type Files = Promise<string[]>
export type Nothing = Promise<void>
export type Maybe<T> = Promise<T | undefined>
export type Modifier<T> = (value?: T) => Maybe<T>

export interface To {
  to(target: string): Nothing
}

export interface Converter {
  parse<T>(text: string): T,
  stringify<T>(value: T): string,
}

export interface Context {
  cwd: string
  logger: Logger
}
