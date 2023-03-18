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
  startDateGreater: string
  startDateLesser: string
  endDate: string
  endDateGreater: string
  endDateLesser: string
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

const defaultFilters: Filters = {
  mediaType: MediaType.Anime,
  isAdult: false,
  countryOfOrigin: 'JP',
}

const filters = atom<Filters>({
  key: 'filters',
  default: defaultFilters,
  effects: [
    urlSyncEffect({
      refine: custom((x) => x as Filters),
      history: 'replace',
      syncDefault: false,
      write({ write, reset }, newValue) {
        if (newValue instanceof DefaultValue) {
          reset('filters')
        } else {
          write('filters', newValue)
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

export const serializeFilters = (value: Filters): string => {
  try {
    const json = JSON.stringify(value)
    console.log(`serializeFilters: ${json}`)

    return compressToEncodedURIComponent(json)
  } catch (e: unknown) {
    return ''
  }
}

export const deserializeFilters = (value: string): Filters => {
  try {
    const json = decompressFromEncodedURIComponent(value)

    return JSON.parse(json)
  } catch (e: unknown) {
    return defaultFilters
  }
}
