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

const fetchMedia = async (client: GraphQLClient, query: Omit<SearchMediaQueryVariables, 'page'>): Promise<Media[]> => {
  const results = [] as Media[]
  let lastPage = 1

  // TODO: 並列化
  while (lastPage < 5) {
    console.log(`fetchMedia: fetching page ${lastPage}`)

    // eslint-disable-next-line no-await-in-loop
    const { media, isLast } = await fetchMediaWithPage(client, query, lastPage)
    if (media.length > 0) {
      results.push(...media)
      console.log(`fetchMedia: fetched ${media.length} media`)
    }

    if (isLast) {
      console.log(`fetchMedia: page ended ${lastPage}`)
      break
    }

    lastPage++
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
