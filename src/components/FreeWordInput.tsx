import { Input } from '@nextui-org/react'
import { useSetRecoilState } from 'recoil'

import { filtersSelector } from '../lib/atom'

export function FreeWordInput(): JSX.Element {
  const setValue = useSetRecoilState(filtersSelector('search'))

  return (
    <Input
      clearable
      label="Free word"
      labelPlaceholder="Search..."
      onChange={(e) => {
        setValue(e.currentTarget.value)
      }}
    />
  )
}
