import { Dropdown } from '@nextui-org/react'
import {
  IconArrowBigRightLineFilled,
  IconArrowBigRightLines,
  IconCheckbox,
  IconCircleX,
  IconFileUnknown,
} from '@tabler/icons-react'
import { isNonEmpty } from 'ts-array-length'

import { filtersSelector, useSingleDropdownState } from '../lib/atom'

import type { MediaStatus } from '../graphql/types'

type DropdownItem = {
  label: string
  icon: JSX.Element
}

const items: Record<MediaStatus, DropdownItem> = {
  RELEASING: {
    label: 'Releasing',
    icon: <IconArrowBigRightLineFilled />,
  },
  FINISHED: {
    label: 'Finished',
    icon: <IconCheckbox />,
  },
  NOT_YET_RELEASED: {
    label: 'Not Yet Released',
    icon: <IconArrowBigRightLines />,
  },
  HIATUS: {
    label: 'Hiatus',
    icon: <IconFileUnknown />,
  },
  CANCELLED: {
    label: 'Cancelled',
    icon: <IconCircleX />,
  },
}

export function StatusDropdown(): JSX.Element {
  const [keys, onChange] = useSingleDropdownState(filtersSelector('status'))

  return (
    <Dropdown>
      <Dropdown.Button flat>
        Status
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
          ([key, { label, icon }]: [MediaStatus, DropdownItem]) => (
            <Dropdown.Item key={key} icon={icon}>
              {label}
            </Dropdown.Item>
          )
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}
