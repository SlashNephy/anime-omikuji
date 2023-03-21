import { RangeSlider } from '@mantine/core'
import { Text } from '@nextui-org/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'

import { filtersSelector } from '../lib/recoil'

export function EpisodeRangeSlider(): JSX.Element {
  const setLesser = useSetRecoilState(filtersSelector('episodesLesser'))
  const setGreater = useSetRecoilState(filtersSelector('episodesGreater'))

  // TODO: replace with Next UI
  return (
    <>
      <Text>Episodes</Text>
      <RangeSlider
        max={150}
        min={0}
        minRange={1}
        style={{ width: '150px' }}
        onChange={([start, end]) => {
          setLesser(start)
          setGreater(end)
        }}
      />
    </>
  )
}
