import { useQuery } from '@tanstack/react-query'

import { GetViewerDocument } from '../../graphql/generated/graphql'

import type { GetViewerQuery } from '../../graphql/generated/graphql'
import type { GraphQLClient } from 'graphql-request'

export type Visitor = NonNullable<GetViewerQuery['Viewer']>

export const useAniListVisitor = (client: GraphQLClient): [Visitor | null, boolean] => {
  const { data, isLoading } = useQuery<GetViewerQuery>(['visitor', client], async () =>
    client.request(GetViewerDocument)
  )

  return [data?.Viewer ?? null, isLoading]
}
