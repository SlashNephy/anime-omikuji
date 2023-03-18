import { useCallback, useMemo } from 'react'

export const useLocalStorageString = (key: string): [string | null, (newValue: string | null) => void] => {
  const value = useMemo(() => localStorage.getItem(key), [key])
  const updater = useCallback(
    (newValue: string | null) => {
      if (newValue !== null) {
        localStorage.setItem(key, newValue)
      } else {
        localStorage.removeItem(key)
      }
    },
    [key]
  )

  return [value, updater]
}
