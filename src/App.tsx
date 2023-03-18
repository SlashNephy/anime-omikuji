import { Container } from '@nextui-org/react'
import React from 'react'

import { useAniListToken } from './lib/anilist/oauth2'
import { OnAuthorized } from './OnAuthorized'
import { OnUnauthorized } from './OnUnauthorized'

export function App(): JSX.Element {
  const token = useAniListToken()

  return (
    <Container
      md
      css={{
        paddingTop: '$32',
      }}
    >
      {token === null ? <OnUnauthorized /> : <OnAuthorized token={token} />}
    </Container>
  )
}
