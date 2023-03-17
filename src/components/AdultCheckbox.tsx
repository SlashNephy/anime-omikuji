import { Checkbox } from '@nextui-org/react'
import { useRecoilState } from 'recoil'

import { filtersSelector } from '../lib/atom'

export function AdultCheckbox(): JSX.Element {
  const [isAdult, setIsAdult] = useRecoilState(filtersSelector('isAdult'))

  return (
    <Checkbox isSelected={isAdult} onChange={setIsAdult}>
      Include Adult
    </Checkbox>
  )
}
