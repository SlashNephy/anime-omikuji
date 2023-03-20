import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { MediaCard } from './MediaCard'

import type { Media } from '../lib/anilist/media'

export function MediaCardSlot({ media, onSelect }: { media: Media[]; onSelect(selected: Media): void }): JSX.Element {
  const requestRef = useRef<number>()
  const [currentIndex, setCurrentIndex] = useState<number>()
  const currentMedia = useMemo(() => (currentIndex ? media[currentIndex] : undefined), [media, currentIndex])

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
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [currentIndex, animate])

  if (currentMedia === undefined) {
    return <></>
  }

  return (
    <MediaCard
      media={currentMedia}
      onClick={() => {
        onSelect(currentMedia)
      }}
    />
  )
}
