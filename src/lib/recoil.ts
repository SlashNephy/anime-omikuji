import { custom } from '@recoiljs/refine'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import { useCallback } from 'react'
import { atom, DefaultValue, selector, selectorFamily, useRecoilState } from 'recoil'
import { urlSyncEffect } from 'recoil-sync'

import { MediaType } from '../graphql/generated/graphql'

import type { CountryCode } from '../components/CountryOfOriginDropdown'
import type { MediaGenre } from '../components/GenreDropdown'
import type { MediaTag } from '../components/TagDropdown'
import type { MediaFormat, MediaSeason, MediaStatus, MediaSource } from '../graphql/generated/graphql'
import type { Selection } from '@react-types/shared'
import type { RecoilState } from 'recoil'

export type Filters = Partial<{
  season: MediaSeason
  seasonYear: number
  mediaType: MediaType
  isAdult: boolean
  isOnList: boolean
  countryOfOrigin: CountryCode
  search: string
  startDate: string
  startDateGreater: number
  startDateLesser: number
  endDate: string
  endDateGreater: number
  endDateLesser: number
  format: MediaFormat
  formatNot: MediaFormat
  formatIn: [MediaFormat]
  formatNotIn: [MediaFormat]
  status: MediaStatus
  statusNot: MediaStatus
  statusIn: [MediaStatus]
  statusNotIn: [MediaStatus]
  episodes: number
  episodesGreater: number
  episodesLesser: number
  duration: number
  durationGreater: number
  durationLesser: number
  chapters: number
  chaptersGreater: number
  chaptersLesser: number
  volumes: number
  volumesGreater: number
  volumesLesser: number
  genre: MediaGenre
  genreIn: MediaGenre[]
  genreNotIn: MediaGenre[]
  tag: MediaTag
  tagIn: MediaTag[]
  tagNotIn: MediaTag[]
  minimumTagRank: number
  tagCategory: string
  tagCategoryIn: string[]
  tagCategoryNotIn: string[]
  licensedBy: string
  licensedByIn: string[]
  isLicensed: false
  averageScore: number
  averageScoreNot: number
  averageScoreGreater: number
  averageScoreLesser: number
  popularity: number
  popularityNot: number
  popularityGreater: number
  popularityLesser: number
  source: MediaSource
  sourceIn: MediaSource[]
}>

export const defaultFilters: Filters = {
  mediaType: MediaType.Anime,
  isAdult: false,
  countryOfOrigin: 'JP',
}

const filtersKey = 'filters'
export const filters = atom<Filters>({
  key: filtersKey,
  default: defaultFilters,
  effects: [
    urlSyncEffect({
      refine: custom((x) => x as Filters),
      history: 'replace',
      syncDefault: false,
      write({ write, reset }, newValue) {
        if (newValue instanceof DefaultValue) {
          reset(filtersKey)
        } else {
          write(filtersKey, newValue)
        }
      },
    }),
  ],
})

export const filtersSelector = selectorFamily({
  key: 'filtersSelector',
  get<Key extends keyof Filters>(key: Key) {
    return ({ get }) => get(filters)[key]
  },
  set<Key extends keyof Filters>(key: Key) {
    return ({ set }, newValue) => {
      if (newValue instanceof DefaultValue) {
        throw new Error(`${key} is not initialized.`)
      }

      set(filters, (previous) => ({ ...previous, [key]: newValue }))
    }
  },
})

export const filtersQuerySelector = selector<Partial<Filters>>({
  key: 'filtersQuerySelector',
  get: ({ get }) => ({
    ...get(filters),
  }),
})

export const useSingleDropdownState = <T>(state: RecoilState<T>): [NonNullable<T>[], (s: Selection) => void] => {
  const [value, setValue] = useRecoilState(state)
  const setSelection = useCallback(
    (selection: Selection) => {
      if (selection === 'all') {
        return
      }

      const array = Array.from(selection) as T[]
      setValue(array[0] as T)
    },
    [setValue]
  )

  return [value !== undefined && value !== null ? [value] : [], setSelection]
}

export const useMultipleDropdownState = <T>(state: RecoilState<T[] | undefined>): [T[], (s: Selection) => void] => {
  const [values, setValues] = useRecoilState(state)
  const setSelection = useCallback(
    (selection: Selection) => {
      if (selection === 'all') {
        // unsupported
        return
      }

      const array = Array.from(selection) as T[]
      setValues(array)
    },
    [setValues]
  )

  return [values !== undefined ? values : [], setSelection]
}

export const serializeFilters = (payload: unknown): string => {
  const value = (payload as { [filtersKey]?: Filters })[filtersKey]
  if (value === undefined) {
    return ''
  }

  const newValue: Record<string, unknown> = { ...value }
  for (const [k, v] of Object.entries(value)) {
    // trim empty array
    if (Array.isArray(v) && v.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete newValue[k]
    }

    // trim empty string
    if (typeof v === 'string' && v.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete newValue[k]
    }

    // trim default boolean
    if (typeof v === 'boolean' && v === defaultFilters[k as keyof Filters]) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete newValue[k]
    }
  }

  if (Object.keys(newValue).length === 0) {
    return ''
  }

  try {
    const json = JSON.stringify(newValue)
    console.log(`serializeFilters: ${json}`)

    // trim brackets
    return compressToEncodedURIComponent(json.replace(/(^\{|}$)/g, ''))
  } catch (e: unknown) {
    console.error(e)
    return ''
  }
}

export const deserializeFilters = (payload: string): unknown => {
  try {
    const json = decompressFromEncodedURIComponent(payload)

    return {
      // pretend/append brackets
      [filtersKey]: JSON.parse(`{${json}}`),
    }
  } catch (e: unknown) {
    console.error(e)
    return defaultFilters
  }
}
