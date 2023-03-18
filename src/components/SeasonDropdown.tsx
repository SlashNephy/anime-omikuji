import { Dropdown } from '@nextui-org/react'
import { IconFlower, IconPumpkinScary, IconSailboat, IconSnowflake } from '@tabler/icons-react'
import { isNonEmpty } from 'ts-array-length'

import { filtersSelector, useSingleDropdownState } from '../lib/recoil'

import type { MediaSeason } from '../graphql/generated/graphql'

type DropdownItem = {
  label: string
  icon: JSX.Element
}

const items: Record<MediaSeason, DropdownItem> = {
  WINTER: {
    label: 'Winter',
    icon: <IconSnowflake />,
  },
  SPRING: {
    label: 'Spring',
    icon: <IconFlower />,
  },
  SUMMER: {
    label: 'Summer',
    icon: <IconSailboat />,
  },
  FALL: {
    label: 'Fall',
    icon: <IconPumpkinScary />,
  },
}

export function SeasonDropdown(): JSX.Element {
  const [keys, onChange] = useSingleDropdownState(filtersSelector('season'))

  return (
    <Dropdown>
      <Dropdown.Button flat>Season{isNonEmpty(keys) && `: ${items[keys[0]].label}`}</Dropdown.Button>
      <Dropdown.Menu
        items={Object.entries(items)}
        selectedKeys={keys}
        selectionMode="single"
        onSelectionChange={onChange}
      >
        {
          // @ts-expect-error Dropdown.Item does not support generics for now
          ([key, { label, icon }]: [MediaSeason, DropdownItem]) => (
            <Dropdown.Item key={key} icon={icon}>
              {label}
            </Dropdown.Item>
          )
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}
