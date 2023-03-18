import { Switch, useTheme } from '@nextui-org/react'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme as useNextTheme } from 'next-themes'

export function ThemeSwitch(): JSX.Element {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()

  return (
    <Switch
      icon={isDark ? <IconSun /> : <IconMoon />}
      onChange={(e) => {
        setTheme(e.target.checked ? 'light' : 'dark')
      }}
    />
  )
}
