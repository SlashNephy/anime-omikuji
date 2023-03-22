import { RangeSlider } from '@mantine/core'
import { Text } from '@nextui-org/react'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { filtersSelector, maxFilterValues, minFilterValues } from '../lib/recoil'

export function AverageScoreRangeSlider(): JSX.Element {
  const [lesser, setLesser] = useRecoilState(filtersSelector('averageScoreLesser'))
  const [greater, setGreater] = useRecoilState(filtersSelector('averageScoreGreater'))
  const value = useMemo(() => {
    if (lesser === undefined || greater === undefined) {
      return undefined
    }

    return [greater, lesser] as [number, number]
  }, [lesser, greater])

  // TODO: replace with Next UI
  return (
    <>
      <Text>Average Score</Text>
      <RangeSlider
        max={maxFilterValues.averageScoreLesser}
        min={minFilterValues.averageScoreGreater}
        minRange={0.5}
        style={{ width: '150px' }}
        value={value}
        onChange={([start, end]) => {
          setLesser(end)
          setGreater(start)
        }}
      />
    </>
  )
}
