import { Button } from '@nextui-org/react'
import { IconTrash } from '@tabler/icons-react'
import React, { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { defaultFilters, filters } from '../lib/recoil'

export function ClearFiltersButton(): JSX.Element {
  const setFiltersValue = useSetRecoilState(filters)
  const onPress = useCallback(() => {
    setFiltersValue(defaultFilters)
  }, [setFiltersValue])

  return (
    <Button auto ghost color="warning" icon={<IconTrash />} onPress={onPress}>
      Clear Filters
    </Button>
  )
}
