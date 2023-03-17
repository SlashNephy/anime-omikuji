import { Dropdown } from '@nextui-org/react'
import { IconBook, IconDeviceTv } from '@tabler/icons-react'
import { isNonEmpty } from 'ts-array-length'

import { filtersSelector, useSingleDropdownState } from '../lib/atom'

import type { MediaType } from '../graphql/generated/graphql'

type DropdownItem = {
  label: string
  icon: JSX.Element
}

const items: Record<MediaType, DropdownItem> = {
  ANIME: {
    label: 'Anime',
    icon: <IconDeviceTv />,
  },
  MANGA: {
    label: 'Manga',
    icon: <IconBook />,
  },
}

export function MediaTypeDropdown(): JSX.Element {
  const [keys, onChange] = useSingleDropdownState(filtersSelector('mediaType'))

  return (
    <Dropdown>
      <Dropdown.Button flat>Media Type{isNonEmpty(keys) && `: ${items[keys[0]].label}`}</Dropdown.Button>
      <Dropdown.Menu
        items={Object.entries(items)}
        selectedKeys={keys}
        selectionMode="single"
        onSelectionChange={onChange}
      >
        {
          // @ts-expect-error Dropdown.Item does not support generics for now
          ([key, { label, icon }]: [MediaType, DropdownItem]) => (
            <Dropdown.Item key={key} icon={icon}>
              {label}
            </Dropdown.Item>
          )
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}
