// eslint-disable-next-line import/no-unresolved
import { GraphQLClient } from 'graphql-request'
import { useMemo } from 'react'

import type { BearerToken } from './oauth2'

export const useAniListClient = (token: BearerToken): GraphQLClient =>
  useMemo(
    () =>
      new GraphQLClient('https://graphql.anilist.co', {
        headers: {
          authorization: `${token.tokenType} ${token.accessToken}`,
        },
        timeout: 5000,
      }),
    [token]
  )
