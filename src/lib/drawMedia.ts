import { MediaSort } from '../graphql/types'

import type { GetMediaQuery, SearchMediaQueryVariables } from '../graphql/operations'
import type { Sdk } from '../graphql/sdk'

export type Media = NonNullable<NonNullable<GetMediaQuery>['Media']>

export const randomChoose = <T>(array: T[]): T => {
  const result = array[Math.floor(Math.random() * array.length)]
  if (result === undefined) {
    throw new Error('array is empty.')
  }

  return result
}

export const drawMedia = async (
  client: Sdk,
  query: Omit<SearchMediaQueryVariables, 'page' | 'sort'>
): Promise<Media | null> => {
  const sort = randomChoose(Object.values(MediaSort)) as MediaSort

  const ids = await fetchMediaIds(client, { sort, ...query })
  if (ids.length === 0) {
    return null
  }

  const randomId = randomChoose(ids)
  console.log(`drawMedia: random id: ${randomId}`)

  const response = await client.getMedia({
    mediaId: randomId,
  })
  return response.Media ?? null
}

const fetchMediaIds = async (client: Sdk, queries: Omit<SearchMediaQueryVariables, 'page'>): Promise<number[]> => {
  const results = [] as number[]
  let lastPage = 1

  while (lastPage < 5) {
    console.log(`fetchMediaIds: fetching page ${lastPage}`)

    // eslint-disable-next-line no-await-in-loop
    const response = await client.searchMedia({
      page: lastPage,
      ...queries,
    })

    const ids = response.Page?.media?.map((m) => m?.id).filter((x): x is NonNullable<typeof x> => x !== undefined)
    if (ids !== undefined) {
      results.push(...ids)
    }

    if (response.Page?.pageInfo?.hasNextPage !== true || response.Page.media?.length === 0) {
      console.log(`fetchMediaIds: page ended ${lastPage}`)
      break
    }

    const page = response.Page.pageInfo.lastPage
    if (typeof page !== 'number') {
      throw new Error('fetchMediaIds: pageInfo.lastPage is not a number')
    }

    lastPage = page
  }

  return results
}
