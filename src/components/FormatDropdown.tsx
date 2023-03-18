import { Dropdown } from '@nextui-org/react'
import {
  IconBook,
  IconBook2,
  IconCast,
  IconDeviceFloppy,
  IconDeviceTv,
  IconHourglassLow,
  IconMovie,
  IconMusic,
  IconNews,
  IconVideo,
} from '@tabler/icons-react'
import { isNonEmpty } from 'ts-array-length'

import { filtersSelector, useSingleDropdownState } from '../lib/recoil'

import type { MediaFormat } from '../graphql/generated/graphql'

type DropdownItem = {
  label: string
  icon: JSX.Element
}

const items: Record<MediaFormat, DropdownItem> = {
  TV: {
    label: 'TV Show',
    icon: <IconDeviceTv />,
  },
  MOVIE: {
    label: 'Movie',
    icon: <IconMovie />,
  },
  TV_SHORT: {
    label: 'TV Short',
    icon: <IconHourglassLow />,
  },
  SPECIAL: {
    label: 'Special',
    icon: <IconVideo />,
  },
  OVA: {
    label: 'OVA',
    icon: <IconDeviceFloppy />,
  },
  ONA: {
    label: 'ONA',
    icon: <IconCast />,
  },
  MUSIC: {
    label: 'Music',
    icon: <IconMusic />,
  },
  MANGA: {
    label: 'Manga',
    icon: <IconBook />,
  },
  NOVEL: {
    label: 'Light Novel',
    icon: <IconBook2 />,
  },
  ONE_SHOT: {
    label: 'One Shot',
    icon: <IconNews />,
  },
}

export function FormatDropdown(): JSX.Element {
  const [keys, onChange] = useSingleDropdownState(filtersSelector('format'))

  return (
    <Dropdown>
      <Dropdown.Button flat>
        Format
        {isNonEmpty(keys) && `: ${items[keys[0]].label}`}
      </Dropdown.Button>
      <Dropdown.Menu
        items={Object.entries(items)}
        selectedKeys={keys}
        selectionMode="single"
        onSelectionChange={onChange}
      >
        {
          // @ts-expect-error Dropdown.Item does not support generics for now
          ([key, { label, icon }]: [MediaFormat, DropdownItem]) => (
            <Dropdown.Item key={key} icon={icon}>
              {label}
            </Dropdown.Item>
          )
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}
