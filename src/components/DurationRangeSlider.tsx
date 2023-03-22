import { RangeSlider } from '@mantine/core'
import { Text } from '@nextui-org/react'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { filtersSelector, maxFilterValues, minFilterValues } from '../lib/recoil'

export function DurationRangeSlider(): JSX.Element {
  const [lesser, setLesser] = useRecoilState(filtersSelector('durationLesser'))
  const [greater, setGreater] = useRecoilState(filtersSelector('durationGreater'))
  const value = useMemo(() => {
    if (lesser === undefined || greater === undefined) {
      return undefined
    }

    return [greater + 1, lesser - 1] as [number, number]
  }, [lesser, greater])

  // TODO: replace with Next UI
  return (
    <>
      <Text>Duration</Text>
      <RangeSlider
        max={maxFilterValues.durationLesser}
        min={minFilterValues.durationGreater}
        minRange={1}
        style={{ width: '150px' }}
        value={value}
        onChange={([start, end]) => {
          setGreater(start - 1)
          setLesser(end + 1)
        }}
      />
    </>
  )
}
