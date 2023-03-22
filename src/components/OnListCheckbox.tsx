import { Checkbox } from '@nextui-org/react'
import { useState } from 'react'
import { useRecoilState } from 'recoil'

import { filtersSelector } from '../lib/recoil'

export function OnListCheckbox(): JSX.Element {
  const [isOnList, setIsOnList] = useRecoilState(filtersSelector('isOnList'))
  const [isExcluded, setIsExcluded] = useState<boolean>(false)
  const [isIncluded, setIsIncluded] = useState<boolean>(false)

  // FIXME: isSelected is not a valid property of the Checkbox component
  // Warning: React does not recognize the `isSelected` prop on a DOM element.
  // If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `isselected` instead.
  // If you accidentally passed it from a parent component, remove it from the DOM element.
  return (
    <>
      <Checkbox
        isDisabled={isIncluded}
        isSelected={isOnList === false}
        onChange={(v) => {
          setIsExcluded(v)
          switch (v) {
            case true:
              setIsOnList(false)
              return
            default:
              setIsOnList(undefined)
          }
        }}
      >
        Exclude My Anime
      </Checkbox>

      <Checkbox
        isDisabled={isExcluded}
        isSelected={isOnList === true}
        onChange={(v) => {
          setIsIncluded(v)
          switch (v) {
            case true:
              setIsOnList(true)
              return
            default:
              setIsOnList(undefined)
          }
        }}
      >
        Only from My Anime
      </Checkbox>
    </>
  )
}
