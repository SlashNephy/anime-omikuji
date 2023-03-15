import { Button, Card, Container, Link, Loading, Row, Spacer, Text, User } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'

import { AdultCheckbox } from './components/AdultCheckbox'
import { CountryOfOriginDropdown } from './components/CountryOfOriginDropdown'
import { FormatDropdown } from './components/FormatDropdown'
import { FreeWordInput } from './components/FreeWordInput'
import { GenreDropdown } from './components/GenreDropdown'
import { MediaTypeDropdown } from './components/MediaTypeDropdown'
import { OnListCheckbox } from './components/OnListCheckbox'
import { RollButton } from './components/RollButton'
import { SeasonDropdown } from './components/SeasonDropdown'
import { SeasonYearDropdown } from './components/SeasonYearDropdown'
import { StatusDropdown } from './components/StatusDropdown'
import { TagDropdown } from './components/TagDropdown'
import { filtersQuerySelector } from './lib/atom'
import { config } from './lib/config'
import { drawMedia } from './lib/drawMedia'
import { useAniListClient } from './lib/useAniListClient'
import { useAniListToken } from './lib/useAniListToken'

import type { BearerToken } from './lib/useAniListToken'

export function App(): JSX.Element {
  const { token, authorizeUrl } = useAniListToken(config.aniListClientId)

  return (
    <Container
      css={{
        paddingTop: '$32',
      }}
    >
      {token === null ? <OnUnauthorized authorizeUrl={authorizeUrl} /> : <OnAuthorized token={token} />}
    </Container>
  )
}

function OnUnauthorized({ authorizeUrl }: { authorizeUrl: string }): JSX.Element {
  return (
    <Card>
      <Card.Body>
        <Row align="center" justify="center">
          <Link href={authorizeUrl}>
            <Button auto shadow color="gradient">
              Sign in with AniList
            </Button>
          </Link>
          <Text css={{ m: 0 }} size={15}>
            NextUI gives you the best developer experience with all the features you need for building beautiful and
            modern websites and applications.
          </Text>
        </Row>
      </Card.Body>
    </Card>
  )
}

function OnAuthorized({ token }: { token: BearerToken }): JSX.Element {
  const client = useAniListClient(token)
  const { data: visitor, isLoading: isVisitorLoading } = useQuery(['visitor', token], async () => client.getViewer())

  const query = useRecoilValue(filtersQuerySelector)
  const {
    data: media,
    isRefetching: isMediaLoading,
    refetch,
  } = useQuery(['data'], async () => drawMedia(client, query), {
    // trigger on click
    enabled: false,
  })

  return (
    <>
      <Card>
        <Card.Header>
          <Row align="center" justify="center">
            <Text h1>Anime Omikuji</Text>
          </Row>
        </Card.Header>

        <Card.Body>
          <Row align="center" justify="center">
            {isVisitorLoading ? (
              <Loading />
            ) : (
              <>
                <Text>Logged in as</Text>
                <Link href={visitor?.Viewer?.siteUrl ?? undefined} target="_blank">
                  <User name={visitor?.Viewer?.name} src={visitor?.Viewer?.avatar?.large ?? undefined} />
                </Link>
              </>
            )}
          </Row>

          <Spacer y={2} />

          <Row align="center" css={{ gap: '$8' }} justify="center">
            <MediaTypeDropdown />
            <SeasonDropdown />
            <SeasonYearDropdown />
            <CountryOfOriginDropdown />
            <FormatDropdown />
            <StatusDropdown />
            <GenreDropdown />
            <TagDropdown />
          </Row>

          <Spacer y={1} />

          <Row align="center" css={{ gap: '$8' }} justify="center">
            <AdultCheckbox />
            <OnListCheckbox />
            <FreeWordInput />
          </Row>

          <Spacer y={1} />

          <Row align="center" justify="center">
            <RollButton
              onPress={() => {
                refetch().catch(console.error)
              }}
            />
          </Row>
        </Card.Body>
      </Card>

      <Spacer y={2} />

      {media !== undefined && (
        <Card>
          <Card.Body>
            <Row align="center" justify="center">
              {isMediaLoading ? (
                <Loading />
              ) : media === null ? (
                <Text>No media were found that meet your filters...</Text>
              ) : (
                <Link href={media.siteUrl ?? ''} target="_blank">
                  <Text title={`${media.title?.native} / ${media.title?.english}`}>
                    {media.title?.userPreferred ?? ''}
                  </Text>
                </Link>
              )}
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  )
}
