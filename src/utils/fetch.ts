import { HTTPMethod } from 'constants/httpMethod'
import { LINKS } from 'constants/links'
import Router from 'next/router'
import { SearchParams, addSearchParams } from './searchParams'
import { Maybe } from './types'
import { useAuth } from '@clerk/nextjs'

export type FetchArgs = Omit<RequestInit, 'body' | 'method'> & {
  body?: Record<string, unknown> | FormData | string
  toBlob?: boolean
  method?: HTTPMethod
  searchParams?: SearchParams
}

export async function apiFetch(path: string, args?: FetchArgs) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const body = args?.body
  const method = args?.method ?? HTTPMethod.GET
  // full url from which we request
  const url = addSearchParams(`${baseUrl}${path}`, args?.searchParams)

  const options: RequestInit = {
    ...args,
    body: undefined,
    headers: {
      Accept: 'application/com.driverama-v1+json',
      ...getAuthorizationHeader('TODO:REPLACE_TOKEN'),
      ...(global.FormData != null && body instanceof FormData
        ? undefined
        : { 'Content-Type': 'application/json' }),
      ...(args?.headers || {})
    }
  }

  const canIncludeBody = ![HTTPMethod.GET, HTTPMethod.HEAD].includes(method)

  if (canIncludeBody) {
    if (global.FormData != null && body instanceof FormData) {
      options.body = body
    } else {
      options.body = body !== Object(body) ? String(body) : JSON.stringify(body)
    }
  }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`${url}: ${response.status}`)
    }

    return response
  } catch (error) {
    throw error
  }
}

export function getAuthorizationHeader(token: Maybe<string>) {
  return token ? { Authorization: `Bearer ${token}` } : undefined
}
