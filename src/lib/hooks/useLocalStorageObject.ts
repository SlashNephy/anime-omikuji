import { useCallback, useMemo } from 'react'

import { useLocalStorageString } from './useLocalStorageString'

export const useLocalStorageObject = <T>(
  key: string,
  initializer?: () => T | null
): [T | null, (newValue: T | null) => void] => {
  const [json, setJson] = useLocalStorageString(key)

  const updater = useCallback(
    (newObject: T | null) => {
      if (newObject !== null) {
        setJson(JSON.stringify(newObject))
      } else {
        setJson(null)
      }
    },
    [setJson]
  )
  const object = useMemo(() => {
    if (json !== null) {
      return JSON.parse(json)
    }

    if (initializer !== undefined) {
      const initial = initializer()
      updater(initial)
      return initial
    }

    return null
  }, [json])

  return [object, updater]
}
