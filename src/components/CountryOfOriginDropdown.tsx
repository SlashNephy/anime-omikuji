import { Dropdown } from '@nextui-org/react'
import { JP } from 'country-flag-icons/react/1x1'
import { CN, KR, TW } from 'country-flag-icons/react/3x2'
import { isNonEmpty } from 'ts-array-length'

import { filtersSelector, useSingleDropdownState } from '../lib/recoil'

export type CountryCode = 'JP' | 'KR' | 'CN' | 'TW'

type DropdownItem = {
  label: string
  icon: JSX.Element
}

const items: Record<CountryCode, DropdownItem> = {
  JP: {
    label: 'Japan',
    icon: <JP height="24" width="24" />,
  },
  KR: {
    label: 'South Korea',
    icon: <KR height="24" width="24" />,
  },
  CN: {
    label: 'China',
    icon: <CN height="24" width="24" />,
  },
  TW: {
    label: 'Taiwan',
    icon: <TW height="24" width="24" />,
  },
}

export function CountryOfOriginDropdown(): JSX.Element {
  const [keys, onChange] = useSingleDropdownState(filtersSelector('countryOfOrigin'))

  return (
    <Dropdown>
      <Dropdown.Button flat>
        Country of Origin
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
          ([key, { label, icon }]: [CountryCode, DropdownItem]) => (
            <Dropdown.Item key={key} icon={icon}>
              {label}
            </Dropdown.Item>
          )
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}
