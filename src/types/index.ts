import { Logger } from "../logger"

export type File = Promise<string>
export type Files = Promise<string[]>
export type Nothing = Promise<void>
export type Modifier<T> = (obj: T) => Promise<T | undefined>

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
