import { Button, Card, Link, Loading, Row, Spacer, Text, User } from '@nextui-org/react'
import { IconClover, IconMoodSadSquint } from '@tabler/icons-react'
import fontColorContrast from 'font-color-contrast'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { AdultCheckbox } from './components/AdultCheckbox'
import { CountryOfOriginDropdown } from './components/CountryOfOriginDropdown'
import { DoujinCheckbox } from './components/DoujinCheckbox'
import { FormatDropdown } from './components/FormatDropdown'
import { FreeWordInput } from './components/FreeWordInput'
import { GenreDropdown } from './components/GenreDropdown'
import { MediaTypeDropdown } from './components/MediaTypeDropdown'
import { OnListCheckbox } from './components/OnListCheckbox'
import { RollButton } from './components/RollButton'
import { SeasonDropdown } from './components/SeasonDropdown'
import { SeasonYearDropdown } from './components/SeasonYearDropdown'
import { SourceMaterialDropdown } from './components/SourceMaterialDropdown'
import { StatusDropdown } from './components/StatusDropdown'
import { TagDropdown } from './components/TagDropdown'
import { useAniListClient } from './lib/anilist/graphql'
import { useAniListMedia } from './lib/anilist/media'
import { useAniListVisitor } from './lib/anilist/visitor'
import { randomChoose } from './lib/random'
import { filtersQuerySelector } from './lib/recoil'

import type { Media } from './lib/anilist/media'
import type { BearerToken } from './lib/anilist/oauth2'

type RollMode = 'slot' | 'feeling_lucky'

export function OnAuthorized({ token }: { token: BearerToken }): JSX.Element {
  const client = useAniListClient(token)
  const [visitor, isVisitorLoading] = useAniListVisitor(client)

  const query = useRecoilValue(filtersQuerySelector)
  const [media, isMediaLoading, updateMedia] = useAniListMedia(client, query)
  const [chosenMedia, setChosenMedia] = useState<Media>()
  const [activeRollMode, setActiveRollMode] = useState<RollMode>()

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
                <Link href={visitor?.siteUrl ?? undefined} target="_blank">
                  <User name={visitor?.name} src={visitor?.avatar?.large ?? undefined} />
                </Link>
              </>
            )}
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
              isProgressing={activeRollMode === 'slot'}
              onPress={() => {
                setActiveRollMode('slot')
                updateMedia().catch(console.error)
              }}
            />
            <Spacer x={1} />
            <Button
              auto
              ghost
              color="success"
              disabled={activeRollMode === 'feeling_lucky'}
              icon={<IconClover />}
              onPress={() => {
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
            >
              {/* eslint-disable-next-line quotes */}
              {activeRollMode === 'feeling_lucky' ? <Loading color="white" size="sm" /> : "I'm Feeling Lucky"}
            </Button>
          </Row>
        </Card.Body>
      </Card>

      <Spacer y={2} />

      {media === undefined ? (
        <></>
      ) : isMediaLoading ? (
        <Row align="center" justify="center">
          <Card css={{ mw: '300px' }}>
            <Card.Body>
              <Row align="center" justify="center">
                <Text>Fetching Data...</Text>
              </Row>
              <Spacer y={1} />
              {/* TODO */}
              {/* <Progress shadow striped color="success" /> */}
              <Loading />
            </Card.Body>
          </Card>
        </Row>
      ) : media.length === 0 ? (
        <Row align="center" justify="center">
          <Card css={{ mw: '400px' }}>
            <Card.Body>
              <Row align="center" justify="center">
                <IconMoodSadSquint />
              </Row>
              <Spacer y={1} />
              <Row align="center" justify="center">
                <Text>No media were found that meet your filters...</Text>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      ) : activeRollMode === 'slot' ? (
        <Row align="center" justify="center">
          <MediaSlot
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
            <MediaCard media={chosenMedia} />
          </Row>
        )
      )}
    </>
  )
}

function MediaSlot({ media, onSelect }: { media: Media[]; onSelect(selected: Media): void }): JSX.Element {
  const requestRef = useRef<number>()
  const [currentIndex, setCurrentIndex] = useState<number>()
  const currentMedia = useMemo(() => (currentIndex ? media[currentIndex] : undefined), [media, currentIndex])
  const [isAnimating, setIsAnimating] = useState(true)

  const animate = useCallback(() => {
    if (media.length > 0) {
      const index = Math.floor(Math.random() * media.length)
      setCurrentIndex(index)
    } else {
      setCurrentIndex(undefined)
    }

    requestRef.current = requestAnimationFrame(animate)
  }, [media])

  useEffect(() => {
    if (!isAnimating) {
      return
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isAnimating, currentIndex, animate])

  if (currentMedia === undefined) {
    return <></>
  }

  return (
    <MediaCard
      media={currentMedia}
      onClick={() => {
        onSelect(currentMedia)
        setIsAnimating((wasAnimating) => !wasAnimating)
      }}
    />
  )
}

function MediaCard({ media, onClick }: { media: Media; onClick?(): void }): JSX.Element {
  return (
    <Link href={media.siteUrl ?? undefined} target="_blank">
      <Card isHoverable css={{ mw: '400px' }}>
        <Card.Body css={{ p: 0 }} onClick={onClick}>
          {media.coverImage?.extraLarge && (
            <Card.Image
              alt={`${media.title?.native} / ${media.title?.english}`}
              objectFit="cover"
              src={media.coverImage.extraLarge}
            />
          )}
        </Card.Body>

        <Card.Footer
          isBlurred
          css={{
            position: 'absolute',
            bgBlur: media.coverImage?.color ? `${media.coverImage.color}66` : '#ffffff66',
            borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row align="center" justify="center">
            <Link href={media.siteUrl ?? undefined} target="_blank">
              <Text
                h4
                color={fontColorContrast(media.coverImage?.color ?? '#ffffff')}
                title={`${media.title?.native} / ${media.title?.english}`}
              >
                {media.title?.userPreferred ?? 'no title'}
              </Text>
            </Link>
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  )
}
