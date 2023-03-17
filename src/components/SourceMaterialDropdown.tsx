import { Dropdown } from '@nextui-org/react'
import { isNonEmpty } from 'ts-array-length'

import { filtersSelector, useSingleDropdownState } from '../lib/atom'

import type { MediaSource } from '../graphql/generated/graphql'

type DropdownItem = {
  label: string
  icon?: JSX.Element
}

const items: Record<MediaSource, DropdownItem> = {
  ORIGINAL: {
    label: 'Original',
  },
  MANGA: {
    label: 'Manga',
  },
  LIGHT_NOVEL: {
    label: 'Light Novel',
  },
  WEB_NOVEL: {
    label: 'Web Novel',
  },
  NOVEL: {
    label: 'Novel',
  },
  ANIME: {
    label: 'Anime',
  },
  VISUAL_NOVEL: {
    label: 'Visual Novel',
  },
  VIDEO_GAME: {
    label: 'Video Game',
  },
  DOUJINSHI: {
    label: 'Doujinshi',
  },
  COMIC: {
    label: 'Comic',
  },
  LIVE_ACTION: {
    label: 'Live Action',
  },
  GAME: {
    label: 'Game',
  },
  MULTIMEDIA_PROJECT: {
    label: 'Multimedia Project',
  },
  PICTURE_BOOK: {
    label: 'Picture Book',
  },
  OTHER: {
    label: 'Other',
  },
}

export function SourceMaterialDropdown(): JSX.Element {
  const [keys, onChange] = useSingleDropdownState(filtersSelector('source'))

  return (
    <Dropdown>
      <Dropdown.Button flat>
        Source Material
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
          ([key, { label, icon }]: [MediaSource, DropdownItem]) => (
            <Dropdown.Item key={key} icon={icon}>
              {label}
            </Dropdown.Item>
          )
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}
