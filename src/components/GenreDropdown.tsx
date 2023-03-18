import { Dropdown } from '@nextui-org/react'

import { filtersSelector, useMultipleDropdownState } from '../lib/recoil'

export type MediaGenre =
  | 'Action'
  | 'Adventure'
  | 'Comedy'
  | 'Drama'
  | 'Ecchi'
  | 'Fantasy'
  | 'Horror'
  | 'Mahou Shoujo'
  | 'Mecha'
  | 'Music'
  | 'Mystery'
  | 'Psychological'
  | 'Romance'
  | 'Sci-Fi'
  | 'Slice of Life'
  | 'Sports'
  | 'Supernatural'
  | 'Thriller'

type DropdownItem = {
  // TODO: make icon prop required
  icon?: JSX.Element
}

const items: Record<MediaGenre, DropdownItem> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  Action: {},
  Adventure: {},
  Comedy: {},
  Drama: {},
  Ecchi: {},
  Fantasy: {},
  Horror: {},
  'Mahou Shoujo': {},
  Mecha: {},
  Music: {},
  Mystery: {},
  Psychological: {},
  Romance: {},
  'Sci-Fi': {},
  'Slice of Life': {},
  Sports: {},
  Supernatural: {},
  Thriller: {},
  /* eslint-enable @typescript-eslint/naming-convention */
}

export function GenreDropdown(): JSX.Element {
  const [keys, onChange] = useMultipleDropdownState(filtersSelector('genreIn'))

  return (
    <Dropdown>
      <Dropdown.Button flat>
        Genres
        {keys.length > 0 && `: ${keys[0]}`}
        {keys.length > 1 && ', ...'}
      </Dropdown.Button>
      <Dropdown.Menu
        items={Object.entries(items)}
        selectedKeys={keys}
        selectionMode="multiple"
        onSelectionChange={onChange}
      >
        {
          // @ts-expect-error Dropdown.Item does not support generics for now
          ([key, { icon }]: [MediaGenre, DropdownItem]) => (
            <Dropdown.Item key={key} icon={icon}>
              {key}
            </Dropdown.Item>
          )
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}
