import { Checkbox } from '@nextui-org/react'
import { useRecoilState } from 'recoil'

import { filtersSelector } from '../lib/atom'

export function DoujinCheckbox(): JSX.Element {
  const [isLicensed, setIsLicensed] = useRecoilState(filtersSelector('isLicensed'))

  return (
    <Checkbox
      isSelected={isLicensed}
      onChange={(isSelected) => {
        setIsLicensed(isSelected ? undefined : false)
      }}
    >
      Doujin
    </Checkbox>
  )
}
