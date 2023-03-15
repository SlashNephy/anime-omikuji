import { Checkbox } from '@nextui-org/react'
import { useSetRecoilState } from 'recoil'

import { filtersSelector } from '../lib/atom'

export function AdultCheckbox(): JSX.Element {
  const setValue = useSetRecoilState(filtersSelector('isAdult'))

  return <Checkbox onChange={setValue}>Include Adult</Checkbox>
}
