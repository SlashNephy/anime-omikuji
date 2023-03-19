import { useQuery } from '@tanstack/react-query'

import { SearchMediaDocument, MediaSort } from '../../graphql/generated/graphql'
import { randomChoose } from '../random'

import type { SearchMediaQuery, SearchMediaQueryVariables } from '../../graphql/generated/graphql'
import type { QueryObserverResult } from '@tanstack/react-query'
import type { GraphQLClient } from 'graphql-request'

export type Media = NonNullable<NonNullable<NonNullable<SearchMediaQuery['Page']>['media']>[0]>

export const useAniListMedia = (
  client: GraphQLClient,
  query: Omit<SearchMediaQueryVariables, 'page' | 'sort'>
): [Media[] | undefined, boolean, () => Promise<QueryObserverResult<Media[]>>] => {
  const { data, isFetching, refetch } = useQuery(
    ['media'],
    async () => {
      const sort = randomChoose(Object.values(MediaSort))
      return fetchMedia(client, { sort, ...query })
    },
    {
      // manual trigger
      enabled: false,
    }
  )

  return [data, isFetching, refetch]
}

const maxPage = 5

const fetchMedia = async (client: GraphQLClient, query: Omit<SearchMediaQueryVariables, 'page'>): Promise<Media[]> => {
  const promises: Promise<{ media: Media[] }>[] = []
  for (let i = 1; i < maxPage; i++) {
    promises.push(fetchMediaWithPage(client, query, i))
  }

  const results = [] as Media[]
  for (const result of await Promise.allSettled(promises)) {
    if (result.status === 'fulfilled') {
      results.push(...result.value.media)
    } else {
      console.error(result.reason)
    }
  }

  return results
}

const fetchMediaWithPage = async (
  client: GraphQLClient,
  query: Omit<SearchMediaQueryVariables, 'page'>,
  page: number
): Promise<{ media: Media[]; isLast: boolean }> => {
  const response = await client.request(SearchMediaDocument, {
    page,
    ...query,
  })

  const media = response.Page?.media?.filter((x): x is NonNullable<typeof x> => x !== null) ?? []
  const isLast = response.Page?.pageInfo?.hasNextPage !== true || media.length === 0
  return { media, isLast }
}
