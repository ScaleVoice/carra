import { DehydratedState } from '@tanstack/react-query'
import { getHours, getMinutes, isValid, parse, parseISO, set } from 'date-fns'
import { Dispatch, SetStateAction } from 'react'
import {
  FieldPath,
  FieldValues,
  Path,
  UseFormReturn,
  get
} from 'react-hook-form'

export function assertUnreachable(arg: never): never {
  throw new Error(`Didn't expect arg [${arg}] to get here`)
}

export function safelyAssertUnreachable(arg: never): null {
  return null
}

export function nameOf<Value>(name: Path<Value>): string {
  return name
}

// TODO: remove after upgrade to TS 4.5
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#the-awaited-type-and-promise-improvements
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T

export type Primitive = string | number | boolean | null | undefined

export type Maybe<Value> = Value | undefined | null

export type PromiseThenType<T> = T extends PromiseLike<infer U>
  ? PromiseThenType<U>
  : T

export type FormValues<T> = T extends UseFormReturn<infer Values>
  ? Values
  : never

export type ArrayElementType<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never

export function isNum(input: unknown): input is number {
  return typeof input === 'number' && !Number.isNaN(input)
}

export function isString(input: unknown): input is string {
  return typeof input === 'string'
}

export function isNil<T>(val: T | null | undefined): val is null | undefined {
  return val === undefined || val === null
}

export function isNotNil<T>(val: T | null | undefined): val is T {
  return !isNil(val)
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number'
}

export type SetState<T> = Dispatch<SetStateAction<T>>

export function parseServerTime(timeString: string): Date {
  const timeWithSeconds = parse(timeString, 'HH:mm:ss', new Date())
  if (isValid(timeWithSeconds)) {
    return timeWithSeconds
  }

  return parse(timeString, 'HH:mm', new Date())
}

export function parseServerDate(dateString: string): Date {
  return parse(dateString, 'yyyy-MM-dd', new Date())
}

export function parseServerDateAndTime(
  dateString: string,
  timeString: string
): Date {
  const date = parseServerDate(dateString)
  const time = parseServerTime(timeString)
  return set(date, { hours: getHours(time), minutes: getMinutes(time) })
}

export function parseServerDateTime(dateTimeString: string): Date {
  return parseISO(dateTimeString)
}

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
export type Exclusive<T, U> = T | U extends Record<string, unknown>
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface PagePrefetchProps {
  errorStatusCode?: number | null
  // NOTE: hydration is handled in src/pages/_app.tsx
  dehydratedState?: DehydratedState | null
}

type GetFormErrorArgs<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
  form: UseFormReturn<TFieldValues>
}

export function getFormError<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(args: GetFormErrorArgs<TFieldValues, TName>) {
  return get(args.form.formState.errors, `${args.name}.message`)
}

export interface Coordinates {
  latitude: number
  longitude: number
}

export type GetArrayElementType<T extends readonly unknown[]> =
  T extends readonly (infer U)[] ? U : never

// `T extends T` allows us to match entries for union types
export type Entries<T> = T extends T
  ? {
      [K in keyof T]: [K, T[K]]
    }[keyof T][]
  : never

export function isInArray<T, A extends T>(
  item: T,
  array: ReadonlyArray<A>
): item is A {
  return array.includes(item as A)
}

export function entriesOf<T extends Record<string, unknown>>(
  object: T
): Entries<T> {
  return Object.entries(object) as Entries<T>
}

// https://stackoverflow.com/a/68699273
export type PartialDeep<T> = T extends
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | symbol
  | Date
  ? T
  : // Arrays, Sets and Maps and their readonly counterparts have their items made
  // deeply partial, but their own instances are left untouched
  T extends Array<infer ArrayType>
  ? Array<PartialDeep<ArrayType>>
  : T extends ReadonlyArray<infer ArrayType>
  ? ReadonlyArray<ArrayType>
  : T extends Set<infer SetType>
  ? Set<PartialDeep<SetType>>
  : T extends ReadonlySet<infer SetType>
  ? ReadonlySet<SetType>
  : T extends Map<infer KeyType, infer ValueType>
  ? Map<PartialDeep<KeyType>, PartialDeep<ValueType>>
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? ReadonlyMap<PartialDeep<KeyType>, PartialDeep<ValueType>>
  : // ...and finally, all other objects.
    {
      [K in keyof T]?: PartialDeep<T[K]>
    }

export type DeepKey<
  T,
  P extends string
> = P extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? DeepKey<T[Head], Tail>
    : never
  : P extends keyof T
  ? T[P]
  : never
