import { Card, Link, Row, Spacer } from '@nextui-org/react'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { AdultCheckbox } from './components/AdultCheckbox'
import { CountryOfOriginDropdown } from './components/CountryOfOriginDropdown'
import { DoujinCheckbox } from './components/DoujinCheckbox'
import { FeelingLuckyButton } from './components/FeelingLuckyButton'
import { FormatDropdown } from './components/FormatDropdown'
import { FreeWordInput } from './components/FreeWordInput'
import { GenreDropdown } from './components/GenreDropdown'
import { MediaCard } from './components/MediaCard'
import { MediaCardSlot } from './components/MediaCardSlot'
import { MediaLoadingCard } from './components/MediaLoadingCard'
import { MediaNotFoundCard } from './components/MediaNotFoundCard'
import { MediaTypeDropdown } from './components/MediaTypeDropdown'
import { OnListCheckbox } from './components/OnListCheckbox'
import { RollButton } from './components/RollButton'
import { SeasonDropdown } from './components/SeasonDropdown'
import { SeasonYearDropdown } from './components/SeasonYearDropdown'
import { SourceMaterialDropdown } from './components/SourceMaterialDropdown'
import { StatusDropdown } from './components/StatusDropdown'
import { TagDropdown } from './components/TagDropdown'
import { Title } from './components/Title'
import { UserInfo } from './components/UserInfo'
import { useAniListClient } from './lib/anilist/graphql'
import { useAniListMedia } from './lib/anilist/media'
import { randomChoose } from './lib/random'
import { filtersQuerySelector } from './lib/recoil'

import type { Media } from './lib/anilist/media'
import type { BearerToken } from './lib/anilist/oauth2'

type RollMode = 'slot' | 'feeling_lucky'

export function OnAuthorized({ token }: { token: BearerToken }): JSX.Element {
  const client = useAniListClient(token)

  const query = useRecoilValue(filtersQuerySelector)
  const [media, isMediaLoading, updateMedia] = useAniListMedia(client, query)
  const [chosenMedia, setChosenMedia] = useState<Media>()
  const [activeRollMode, setActiveRollMode] = useState<RollMode>()

  return (
    <>
      <Card>
        <Card.Header>
          <Row align="center" justify="center">
            <Title />
          </Row>
        </Card.Header>

        <Card.Body>
          <Row align="center" justify="center">
            <UserInfo client={client} />
          </Row>

          <Spacer y={2} />

          <Row align="center" css={{ gap: '$8' }} justify="center">
            <FreeWordInput />
            <MediaTypeDropdown />
            <GenreDropdown />
            <TagDropdown />
            <SeasonYearDropdown />
            <SeasonDropdown />
          </Row>

          <Spacer y={1} />

          <Row align="center" css={{ gap: '$8' }} justify="center">
            <FormatDropdown />
            <StatusDropdown />
            {/* Available On */}
            <CountryOfOriginDropdown />
            <SourceMaterialDropdown />
          </Row>

          <Spacer y={1} />

          <Row align="center" css={{ gap: '$8' }} justify="center">
            <DoujinCheckbox />
            <OnListCheckbox />
            <AdultCheckbox />
          </Row>

          <Spacer y={2} />

          <Row align="center" justify="center">
            <RollButton
              isDisabled={activeRollMode !== undefined}
              onPress={() => {
                setChosenMedia(undefined)
                setActiveRollMode('slot')
                updateMedia().catch(console.error)
              }}
            />
            <Spacer x={1} />
            <FeelingLuckyButton
              isDisabled={activeRollMode !== undefined}
              onPress={() => {
                setChosenMedia(undefined)
                setActiveRollMode('feeling_lucky')
                updateMedia()
                  .then((results) => {
                    if (results.data === undefined || results.data.length === 0) {
                      return
                    }

                    setChosenMedia(randomChoose(results.data))
                  })
                  .catch(console.error)
                  .finally(() => {
                    setActiveRollMode(undefined)
                  })
              }}
            />
          </Row>
        </Card.Body>
      </Card>

      <Spacer y={2} />

      {isMediaLoading ? (
        <Row align="center" justify="center">
          <MediaLoadingCard />
        </Row>
      ) : media === undefined ? (
        <></>
      ) : media.length === 0 ? (
        <Row align="center" justify="center">
          <MediaNotFoundCard />
        </Row>
      ) : activeRollMode === 'slot' ? (
        <Row align="center" justify="center">
          <MediaCardSlot
            media={media}
            onSelect={(selected) => {
              setChosenMedia(selected)
              setActiveRollMode(undefined)
            }}
          />
        </Row>
      ) : (
        chosenMedia && (
          <Row align="center" justify="center">
            <Link href={chosenMedia.siteUrl ?? undefined} target="_blank">
              <MediaCard media={chosenMedia} />
            </Link>
          </Row>
        )
      )}
    </>
  )
}
