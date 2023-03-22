import { Checkbox } from '@nextui-org/react'
import { useRecoilState } from 'recoil'

import { filtersSelector } from '../lib/recoil'

export function AdultCheckbox(): JSX.Element {
  const [isAdult, setIsAdult] = useRecoilState(filtersSelector('isAdult'))

  // FIXME: isSelected is not a valid property of the Checkbox component
  // Warning: React does not recognize the `isSelected` prop on a DOM element.
  // If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `isselected` instead.
  // If you accidentally passed it from a parent component, remove it from the DOM element.
  return (
    <Checkbox isSelected={isAdult} onChange={setIsAdult}>
      Include Adult
    </Checkbox>
  )
}
