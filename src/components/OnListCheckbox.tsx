import { Checkbox } from '@nextui-org/react'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { filtersSelector } from '../lib/atom'

export function OnListCheckbox(): JSX.Element {
  const setValue = useSetRecoilState(filtersSelector('isOnList'))
  const [isExcluded, setIsExcluded] = useState<boolean>(false)
  const [isIncluded, setIsIncluded] = useState<boolean>(false)

  return (
    <>
      <Checkbox
        isDisabled={isIncluded}
        onChange={(v) => {
          setIsExcluded(v)
          switch (v) {
            case true:
              setValue(false)
              return
            default:
              setValue(undefined)
          }
        }}
      >
        Exclude My Anime
      </Checkbox>

      <Checkbox
        isDisabled={isExcluded}
        onChange={(v) => {
          setIsIncluded(v)
          switch (v) {
            case true:
              setValue(true)
              return
            default:
              setValue(undefined)
          }
        }}
      >
        Only from My Anime
      </Checkbox>
    </>
  )
}
