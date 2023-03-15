import { Button } from '@nextui-org/react'
import { IconDice3 } from '@tabler/icons-react'

export function RollButton({ onPress }: { onPress(): void }): JSX.Element {
  return (
    <Button icon={<IconDice3 />} onPress={onPress}>
      Roll
    </Button>
  )
}
