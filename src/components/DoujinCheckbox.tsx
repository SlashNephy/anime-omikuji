import { Checkbox } from '@nextui-org/react'
import { useRecoilState } from 'recoil'

import { filtersSelector } from '../lib/recoil'

export function DoujinCheckbox(): JSX.Element {
  const [isLicensed, setIsLicensed] = useRecoilState(filtersSelector('isLicensed'))

  // FIXME: isSelected is not a valid property of the Checkbox component
  // Warning: React does not recognize the `isSelected` prop on a DOM element.
  // If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `isselected` instead.
  // If you accidentally passed it from a parent component, remove it from the DOM element.
  return (
    <Checkbox
      isSelected={isLicensed === false}
      onChange={(isChecked) => {
        setIsLicensed(isChecked ? false : undefined)
      }}
    >
      Doujin
    </Checkbox>
  )
}
