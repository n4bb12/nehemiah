export type File = Promise<string>
export type Files = Promise<string[]>
export type Nothing = Promise<void>
export type Modifier = <T>(obj: T) => T | undefined

export interface Converter {
  parse<T>(text: string): T,
  stringify<T>(value: T): string,
}
