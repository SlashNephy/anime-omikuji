import { addSeconds, getMilliseconds } from 'date-fns'
import secondsToMilliseconds from 'date-fns/secondsToMilliseconds'
import { useEffect, useMemo } from 'react'

import { useLocalStorageObject } from '../hooks/useLocalStorageObject'
import { useLocalStorageString } from '../hooks/useLocalStorageString'

export type BearerToken = {
  accessToken: string
  expiresAt: number
  tokenType: 'Bearer'
}

// Implicit Grant
// https://anilist.gitbook.io/anilist-apiv2-docs/overview/oauth/implicit-grant
export const useAniListToken = (): BearerToken | null => {
  const [token, setToken] = useLocalStorageObject<BearerToken>('anilist-token', () => {
    const hash = new URLSearchParams(
      window.location.hash.substring(1) // skip the leading '#'
    )

    const accessToken = hash.get('access_token')
    const expiresIn = hash.get('expires_in')
    const tokenType = hash.get('token_type')
    if (accessToken === null || expiresIn === null || tokenType !== 'Bearer') {
      return null
    }

    return {
      accessToken,
      expiresAt: getMilliseconds(addSeconds(Date.now(), parseInt(expiresIn, 10))),
      tokenType,
    }
  })

  // keep search params in localStorage for pre-login
  const [search, setSearch] = useLocalStorageString('anilist-filters')
  useEffect(() => {
    if (token === null && window.location.search !== '') {
      setSearch(window.location.search)
    }
    if (token !== null && search !== null && window.location.search === '') {
      window.location.search = search
      setSearch(null)
    }
  }, [token, search, setSearch])

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
  }, [])

  // clear the hash
  useEffect(() => {
    if (token !== null) {
      window.location.hash = ''
    }
  }, [token])

  return token
}

const anilistClientIds = {
  localhost: '11671',
  cloudflarePages: '11693',
  cloudflarePagesCustomDomain: '11694',
}

export const useAniListAuthorizeUrl = (): string => {
  const clientId = useMemo(() => {
    const domain = window.location.hostname
    if (/^(.+\.)?anime-omikuji\.pages\.dev$/.test(domain)) {
      return anilistClientIds.cloudflarePages
    }

    if (domain === 'omikuji.starry.blue') {
      return anilistClientIds.cloudflarePagesCustomDomain
    }

    return anilistClientIds.localhost
  }, [])

  return `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`
}
