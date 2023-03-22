import { RangeSlider } from '@mantine/core'
import { Text } from '@nextui-org/react'
import { addYears, getYear } from 'date-fns'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { filtersSelector } from '../lib/recoil'

export function YearRangeSlider(): JSX.Element {
  const [lesser, setLesser] = useRecoilState(filtersSelector('startDateLesser'))
  const [greater, setGreater] = useRecoilState(filtersSelector('startDateGreater'))
  const value = useMemo(() => {
    if (lesser === undefined || greater === undefined) {
      return undefined
    }

    const start = (greater + 1) / 10000
    const end = lesser / 10000 - 1
    return [start, end] as [number, number]
  }, [lesser, greater])

  // TODO: replace with Next UI
  return (
    <>
      <Text>Year Range</Text>
      <RangeSlider
        max={getYear(addYears(Date.now(), 1))}
        min={1970}
        minRange={1}
        style={{ width: '150px' }}
        value={value}
        onChange={([start, end]) => {
          setGreater(start * 10000 - 1)
          setLesser((end + 1) * 10000)
        }}
      />
    </>
  )
}
