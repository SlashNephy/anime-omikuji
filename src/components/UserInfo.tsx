import { Link, Loading, Text, User } from '@nextui-org/react'
import React from 'react'

import { useAniListVisitor } from '../lib/anilist/visitor'

import type { GraphQLClient } from 'graphql-request'

export function UserInfo({ client }: { client: GraphQLClient }): JSX.Element {
  const [visitor, isVisitorLoading] = useAniListVisitor(client)

  return isVisitorLoading ? (
    <Loading />
  ) : (
    <>
      <Text>Logged in as</Text>
      <Link href={visitor?.siteUrl ?? undefined} target="_blank">
        <User name={visitor?.name} src={visitor?.avatar?.large ?? undefined} />
      </Link>
    </>
  )
}
