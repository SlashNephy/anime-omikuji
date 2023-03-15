import { GraphQLClient } from 'graphql-request'
import { useMemo } from 'react'

import { getSdk } from '../graphql/sdk'

import type { BearerToken } from './useAniListToken'
import type { Sdk } from '../graphql/sdk'

export const useAniListClient = (token: BearerToken): Sdk =>
  useMemo(() => {
    const client = new GraphQLClient('https://graphql.anilist.co', {
      headers: {
        authorization: `${token.tokenType} ${token.accessToken}`,
      },
    })

    return getSdk(client)
  }, [token])
