import { RangeSlider } from '@mantine/core'
import { Text } from '@nextui-org/react'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { filtersSelector, maxFilterValues, minFilterValues, yearToDateGreater, yearToDateLesser } from '../lib/recoil'

export function YearRangeSlider(): JSX.Element {
  const [lesser, setLesser] = useRecoilState(filtersSelector('startDateLesser'))
  const [greater, setGreater] = useRecoilState(filtersSelector('startDateGreater'))
  const value = useMemo(() => {
    if (lesser === undefined || greater === undefined) {
      return undefined
    }

    const start = dateGreaterToYear(greater)
    const end = dateLesserToYear(lesser)
    return [start, end] as [number, number]
  }, [lesser, greater])

  // TODO: replace with Next UI
  return (
    <>
      <Text>Year Range</Text>
      <RangeSlider
        max={dateLesserToYear(maxFilterValues.startDateLesser)}
        min={dateGreaterToYear(minFilterValues.startDateGreater)}
        minRange={1}
        style={{ width: '150px' }}
        value={value}
        onChange={([start, end]) => {
          setGreater(yearToDateGreater(start))
          setLesser(yearToDateLesser(end))
        }}
      />
    </>
  )
}

const dateLesserToYear = (lesser: number): number => lesser / 1_0000 - 1
const dateGreaterToYear = (greater: number): number => (greater + 1) / 1_0000
