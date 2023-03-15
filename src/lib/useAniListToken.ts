import secondsToMilliseconds from 'date-fns/secondsToMilliseconds'
import { useEffect } from 'react'

import { getAuthorizeUrl } from './oauth2'
import { useLocalStorageObject } from './useLocalStorageValue'

export type BearerToken = {
  accessToken: string
  expiresAt: number
  tokenType: 'Bearer'
}

// Implicit Grant
// https://anilist.gitbook.io/anilist-apiv2-docs/overview/oauth/implicit-grant
export const useAniListToken = (clientId: string): { token: BearerToken | null; authorizeUrl: string } => {
  const [token, setToken] = useLocalStorageObject<BearerToken>('anilist-token', () => {
    const hash = new URLSearchParams(
      window.location.hash.substring(1) // skip the leading '#'
    )

    const accessToken = hash.get('access_token')
    const expiresIn = hash.get('expires_in')
    const tokenType = hash.get('token_type')

    // clear the hash
    window.location.hash = ''

    if (accessToken === null || expiresIn === null || tokenType !== 'Bearer') {
      return null
    }

    return {
      accessToken,
      expiresAt: Date.now() + secondsToMilliseconds(parseInt(expiresIn, 10)),
      tokenType,
    }
  })

  // check expiration
  useEffect(() => {
    if (token === null) {
      return
    }

    // check every 10 seconds
    const timer = setInterval(() => {
      if (token.expiresAt < Date.now()) {
        setToken(null)
      }
    }, secondsToMilliseconds(10))
    return () => {
      clearInterval(timer)
    }
  })

  return {
    token,
    authorizeUrl: getAuthorizeUrl(clientId),
  }
}
