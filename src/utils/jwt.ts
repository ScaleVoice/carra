/*
 * jwt-simple
 *
 * JSON Web Token encode and decode module for node.js
 *
 * Copyright(c) 2011 Kazuhito Hokamura
 * MIT Licensed
 */

import crypto from 'crypto'

/**
 * Decode jwt
 */
export function decodeJWT(token: string, key: string, noVerify?: boolean) {
  // check token
  if (!token) {
    throw new Error('No token supplied')
  }
  // check segments
  const segments = token.split('.')
  if (segments.length !== 3) {
    throw new Error('Not enough or too many segments')
  }

  // All segment should be base64
  const headerSeg = segments[0]
  const payloadSeg = segments[1]
  const signatureSeg = segments[2]

  // base64 decode and parse JSON
  const payload = JSON.parse(base64urlDecode(payloadSeg))

  if (!noVerify) {
    const signingMethod = 'sha256'
    const signingType = 'hmac'
    if (!signingMethod || !signingType) {
      throw new Error('Algorithm not supported')
    }

    // verify signature. `sign` will return base64 string.
    const signingInput = [headerSeg, payloadSeg].join('.')

    if (!verify(signingInput, key, signatureSeg)) {
      throw new Error('Signature verification failed')
    }

    // Support for nbf and exp claims.
    // According to the RFC, they should be in seconds.
    if (payload.nbf && Date.now() < payload.nbf * 1000) {
      throw new Error('Token not yet active')
    }

    if (payload.exp && Date.now() > payload.exp * 1000) {
      throw new Error('Token expired')
    }
  }

  return payload
}

/**
 * Encode jwt
 */
export function encodeJWT(
  payload: Record<string, unknown>,
  secret: string,
  options?: Record<string, Record<string, string>>
) {
  const signingMethod = 'sha256'
  const signingType = 'hmap'
  if (!signingMethod || !signingType) {
    throw new Error('Algorithm not supported')
  }

  // header, typ is fixed value.
  const header = { typ: 'JWT', alg: 'HS256' }
  if (options && options.header) {
    assignProperties(header, options.header)
  }

  // create segments, all segments should be base64 string
  const segments = []
  segments.push(base64urlEncode(JSON.stringify(header)))
  segments.push(base64urlEncode(JSON.stringify(payload)))
  segments.push(sign(segments.join('.'), secret))

  return segments.join('.')
}

/**
 * private util functions
 */
function assignProperties(
  dest: Record<string, string>,
  source: Record<string, string>
) {
  for (const attr in source) {
    if (source.hasOwnProperty(attr)) {
      dest[attr] = source[attr]
    }
  }
}

function verify(input: string, secret: string, signature: string) {
  return signature === sign(input, secret)
}

function sign(input: string, secret: string) {
  const base64str = crypto
    .createHmac('sha256', secret)
    .update(input)
    .digest('base64')

  return base64urlEscape(base64str)
}

export function base64urlDecode(str: string) {
  return Buffer.from(base64urlUnescape(str), 'base64').toString()
}

function base64urlUnescape(str: string) {
  str += new Array(5 - (str.length % 4)).join('=')
  return str.replace(/-/g, '+').replace(/_/g, '/')
}

function base64urlEncode(str: string) {
  return base64urlEscape(Buffer.from(str).toString('base64'))
}

function base64urlEscape(str: string) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}
