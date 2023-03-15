import { Dropdown } from '@nextui-org/react'

import { filtersSelector, useSingleDropdownState } from '../lib/atom'

type DropdownItem = {
  // eslint-disable-next-line react/no-unused-prop-types
  year: number
}

const range = (from: number, to: number): number[] => new Array(to - from + 1).fill(0).map((_, i) => i + from)

const items: DropdownItem[] = range(1940, new Date().getFullYear() + 1)
  .map((i) => ({
    year: i,
  }))
  .reverse()

export function SeasonYearDropdown(): JSX.Element {
  const [keys, onChange] = useSingleDropdownState(filtersSelector('seasonYear'))

  return (
    <Dropdown>
      <Dropdown.Button flat>Year{keys.length > 0 && `: ${keys[0]}`}</Dropdown.Button>
      <Dropdown.Menu items={items} selectedKeys={keys} selectionMode="single" onSelectionChange={onChange}>
        {
          // @ts-expect-error Dropdown.Item does not support generics for now
          ({ year }: DropdownItem) => <Dropdown.Item key={year}>{year.toString()}</Dropdown.Item>
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}
