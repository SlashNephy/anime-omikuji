import { Input } from '@nextui-org/react'
import { useRecoilState } from 'recoil'

import { filtersSelector } from '../lib/recoil'

export function FreeWordInput(): JSX.Element {
  const [value, setValue] = useRecoilState(filtersSelector('search'))

  return (
    <Input
      clearable
      label="Search"
      labelPlaceholder="Search..."
      value={value}
      onChange={(e) => {
        setValue(e.currentTarget.value)
      }}
    />
  )
}
