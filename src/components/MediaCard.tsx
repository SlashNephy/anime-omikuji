import { Card, Row, Text } from '@nextui-org/react'
import fontColorContrast from 'font-color-contrast'
import React from 'react'

import type { Media } from '../lib/anilist/media'

export function MediaCard({ media, onClick }: { media: Media; onClick?(): void }): JSX.Element {
  return (
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
          <Text
            h4
            color={fontColorContrast(media.coverImage?.color ?? '#ffffff')}
            title={`${media.title?.native} / ${media.title?.english}`}
          >
            {media.title?.userPreferred ?? 'no title'}
          </Text>
        </Row>
      </Card.Footer>
    </Card>
  )
}
