import { RangeSlider } from '@mantine/core'
import { Text } from '@nextui-org/react'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { filtersSelector } from '../lib/recoil'

export function DurationRangeSlider(): JSX.Element {
  const [lesser, setLesser] = useRecoilState(filtersSelector('durationLesser'))
  const [greater, setGreater] = useRecoilState(filtersSelector('durationGreater'))
  const value = useMemo(() => {
    if (lesser === undefined || greater === undefined) {
      return undefined
    }

    return [lesser, greater] as [number, number]
  }, [lesser, greater])

  // TODO: replace with Next UI
  return (
    <>
      <Text>Duration</Text>
      <RangeSlider
        max={170}
        min={0}
        minRange={1}
        style={{ width: '150px' }}
        value={value}
        onChange={([start, end]) => {
          setLesser(start)
          setGreater(end)
        }}
      />
    </>
  )
}
