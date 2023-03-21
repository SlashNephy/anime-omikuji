import { RangeSlider } from '@mantine/core'
import { Text } from '@nextui-org/react'
import { addYears, getYear } from 'date-fns'
import React from 'react'
import { useSetRecoilState } from 'recoil'

import { filtersSelector } from '../lib/recoil'

export function YearRangeSlider(): JSX.Element {
  const setLesser = useSetRecoilState(filtersSelector('startDateLesser'))
  const setGreater = useSetRecoilState(filtersSelector('startDateGreater'))

  // TODO: replace with Next UI
  return (
    <>
      <Text>Year Range</Text>
      <RangeSlider
        max={getYear(addYears(Date.now(), 1))}
        min={1970}
        minRange={1}
        style={{ width: '150px' }}
        onChange={([start, end]) => {
          setLesser(start * 10000 - 1)
          setGreater((end + 1) * 10000)
        }}
      />
    </>
  )
}
