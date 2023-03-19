import { Button } from '@nextui-org/react'
import { IconDice1, IconDice2, IconDice3, IconDice4, IconDice5, IconDice6 } from '@tabler/icons-react'
import React, { useState } from 'react'

import { randomChoose } from '../lib/random'

const dices = [
  <IconDice1 key="1" />,
  <IconDice2 key="2" />,
  <IconDice3 key="3" />,
  <IconDice4 key="4" />,
  <IconDice5 key="5" />,
  <IconDice6 key="6" />,
]

export function RollButton({ isDisabled, onPress }: { isDisabled: boolean; onPress(): void }): JSX.Element {
  const [icon, setIcon] = useState(<IconDice3 />)

  return (
    <Button
      auto
      ghost
      color="secondary"
      disabled={isDisabled}
      icon={icon}
      onPress={onPress}
      onMouseEnter={() => {
        setIcon(randomChoose(dices))
      }}
    >
      Click to Roll
    </Button>
  )
}
