import { Button } from '@nextui-org/react'
import { IconClover } from '@tabler/icons-react'
import React from 'react'

export function FeelingLuckyButton({ isDisabled, onPress }: { isDisabled: boolean; onPress(): void }): JSX.Element {
  return (
    <Button auto ghost color="success" disabled={isDisabled} icon={<IconClover />} onPress={onPress}>
      I&apos;m Feeling Lucky
    </Button>
  )
}
