import { RangeSlider } from '@mantine/core'
import { Text } from '@nextui-org/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'

import { filtersSelector } from '../lib/recoil'

export function DurationRangeSlider(): JSX.Element {
  const setLesser = useSetRecoilState(filtersSelector('durationLesser'))
  const setGreater = useSetRecoilState(filtersSelector('durationGreater'))

  // TODO: replace with Next UI
  return (
    <>
      <Text>Duration</Text>
      <RangeSlider
        max={170}
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
