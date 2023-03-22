import { RangeSlider } from '@mantine/core'
import { Text } from '@nextui-org/react'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { filtersSelector } from '../lib/recoil'

export function EpisodeRangeSlider(): JSX.Element {
  const [lesser, setLesser] = useRecoilState(filtersSelector('episodesLesser'))
  const [greater, setGreater] = useRecoilState(filtersSelector('episodesGreater'))
  const value = useMemo(() => {
    if (lesser === undefined || greater === undefined) {
      return undefined
    }

    return [greater, lesser] as [number, number]
  }, [lesser, greater])

  // TODO: replace with Next UI
  return (
    <>
      <Text>Episodes</Text>
      <RangeSlider
        max={150}
        min={0}
        minRange={1}
        style={{ width: '150px' }}
        value={value}
        onChange={([start, end]) => {
          setGreater(start)
          setLesser(end)
        }}
      />
    </>
  )
}
