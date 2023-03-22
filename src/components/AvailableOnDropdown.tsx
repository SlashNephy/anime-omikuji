import { Dropdown } from '@nextui-org/react'
import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { MediaType } from '../graphql/generated/graphql'
import { filtersSelector, useMultipleDropdownState } from '../lib/recoil'

export type AvailableOn = StreamingOn | ReadableOn

type StreamingOn =
  | 'Crunchyroll'
  | 'Hulu'
  | 'Funimation'
  | 'Netflix'
  | 'YouTube'
  | 'HIDIVE'
  | 'Amazon'
  | 'Vimeo'
  | 'VRV'
  | 'HBO Max'
  | 'Wakanim'
  | 'RetroCrush'
  | 'Adult Swim'
  | 'Japanese Film Archives'
  | 'Tubi TV'
  | 'Crackle'
  | 'AsianCrush'
  | 'Midnight Pulp'
  | 'CONtv'
  | 'Fakku'
  | 'Bilibili'
  | 'Disney Plus'
  | 'Bilibili TV'
  | 'Tencent Video'
  | 'iQ'
  | 'Youku'
  | 'WeTV'
  | 'Niconico Video'
  | 'Rooster Teeth'
  | 'iQIYI'
  | 'Star+'

type ReadableOn =
  | ReadableOnEnglish
  | ReadableOnKorean
  | ReadableOnJapanese
  | ReadableOnChinese
  | ReadableOnSpanish
  | ReadableOnThai
  | ReadableOnFrench
  | ReadableOnGerman
type ReadableOnEnglish =
  | 'Crunchyroll'
  | 'Manga.Club'
  | 'Fakku'
  | 'WebComics'
  | 'Manga Plus'
  | 'Webtoons'
  | 'Toomics'
  | 'Lezhin'
  | 'Futekiya'
  | 'Manga Planet'
  | 'Tapas'
  | 'Tappytoon'
  | 'Manta'
  | 'WeComics'
  | 'Webnovel'
  | 'Copin Comics'
  | 'MangaToon'
  | 'J-Novel Club'
  | 'Bilibili Comics'
  | 'Lalatoon'
  | 'DAYcomics'
  | 'MangaPlaza'
  | 'Shonen Jump'
  | 'Azuki'
  | 'Pocket Comics'
  | 'Comikey'
  | 'INKR'
  | 'Alpha Manga'
  | 'Coolmic'
  | 'Lezhin X'
  | 'MANGA UP!'
  | 'Netcomics'
type ReadableOnKorean =
  | 'Lezhin'
  | 'Toomics'
  | 'Justoon'
  | 'Naver Webtoon'
  | 'KakaoPage'
  | 'Bomtoon'
  | 'Peanutoon'
  | 'Comico'
  | 'Comica'
  | 'Bufftoon'
  | 'Naver Series'
  | 'TOPTOON'
  | 'Kakao Webtoon'
  | 'Manyeo Comics'
  | 'Anytoon'
  | 'Mootoon'
  | 'Ktoon'
  | 'Onestory'
  | 'Battle Comics'
  | 'Spooncomics'
  | 'QToon'
  | 'Manhwakyung'
type ReadableOnJapanese =
  | 'Mangabox'
  | 'ComicWalker'
  | 'Nico Nico Seiga'
  | 'Pixiv Comic'
  | 'Pixiv Novel'
  | 'Comico'
  | 'Piccoma'
  | 'Webtoons'
  | 'Shonen Jump Plus'
  | 'Pocket Magazine'
  | 'Sunday Webry'
  | 'Ganma!'
  | 'Cycomics'
  | 'Tonari no Young Jump'
  | 'Manga Park'
  | 'Comic Days'
  | 'Comic Zenon'
  | 'Manga Library Z'
  | 'Manga Love'
  | 'Sukima'
  | 'Comicess'
  | 'Manga Dokuha'
  | 'Alphapolis'
  | 'Ura Sunday'
  | 'Comic Essay'
  | 'Lezhin'
  | 'Kurage Bunch'
  | 'Comic Action'
  | 'Lalatoon'
  | 'Newtype Web'
  | 'Comic Fuz'
  | 'MangaToon'
  | 'Manga Cross'
  | 'Comiplex'
  | 'Comic Meteor'
  | 'Comic Ride'
  | 'Magcomi'
  | 'Web Ace'
  | 'Gangan Online'
  | 'Comic Trail'
  | 'Ciao Comics'
  | 'Toomics'
  | 'BeLTOON'
type ReadableOnChinese =
  | 'Tencent Comics'
  | 'KuaiKan Manhua'
  | 'Weibo Manhua'
  | 'Dajiaochong Manhua'
  | 'Manman Manhua'
  | 'Dongman Manhua'
  | 'Manhuatai'
  | 'Kai Manhua'
  | 'MangaToon'
  | 'Creative Comic Collection'
  | 'Lalatoon'
  | 'MKZhan'
  | 'Bilibili'
  | 'iQIYI'
  | 'Webtoons'
  | 'Zhiyin Manke'
  | 'Kanmanhua'
  | 'TOPTOON'
  | 'Toomics'
  | 'Kakao Webtoon'
  | 'Bomtoon'
  | 'Manhuadao'
type ReadableOnSpanish = 'Lezhin' | 'Webtoons' | 'MangaToon' | 'Toomics'
type ReadableOnThai = 'MangaToon' | 'Webtoons' | 'Comico' | 'Kakao Webtoon' | 'Boomtoon' | 'WeComics'
type ReadableOnFrench =
  | 'MangaToon'
  | 'Webtoons'
  | 'Tappytoon'
  | 'Delitoon'
  | 'Verytoon'
  | 'Toomics'
  | 'Mangas.io'
  | 'Le Bontoon'
type ReadableOnGerman = 'Webtoons' | 'Tappytoon' | 'Toomics' | 'Delitoon B'

type DropdownItem = {
  // TODO: make icon prop required
  icon?: JSX.Element
}

const animeItems: Record<StreamingOn, DropdownItem> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  Crunchyroll: {},
  Hulu: {},
  Funimation: {},
  Netflix: {},
  YouTube: {},
  HIDIVE: {},
  Amazon: {},
  Vimeo: {},
  VRV: {},
  'HBO Max': {},
  Wakanim: {},
  RetroCrush: {},
  'Adult Swim': {},
  'Japanese Film Archives': {},
  'Tubi TV': {},
  Crackle: {},
  AsianCrush: {},
  'Midnight Pulp': {},
  CONtv: {},
  Fakku: {},
  Bilibili: {},
  'Disney Plus': {},
  'Bilibili TV': {},
  'Tencent Video': {},
  iQ: {},
  Youku: {},
  WeTV: {},
  'Niconico Video': {},
  'Rooster Teeth': {},
  iQIYI: {},
  'Star+': {},
  /* eslint-enable @typescript-eslint/naming-convention */
}

const mangaEnglishItems: Record<ReadableOnEnglish, DropdownItem> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  Crunchyroll: {},
  'Manga.Club': {},
  Fakku: {},
  WebComics: {},
  'Manga Plus': {},
  Webtoons: {},
  Toomics: {},
  Lezhin: {},
  Futekiya: {},
  'Manga Planet': {},
  Tapas: {},
  Tappytoon: {},
  Manta: {},
  WeComics: {},
  Webnovel: {},
  'Copin Comics': {},
  MangaToon: {},
  'J-Novel Club': {},
  'Bilibili Comics': {},
  Lalatoon: {},
  DAYcomics: {},
  MangaPlaza: {},
  'Shonen Jump': {},
  Azuki: {},
  'Pocket Comics': {},
  Comikey: {},
  INKR: {},
  'Alpha Manga': {},
  Coolmic: {},
  'Lezhin X': {},
  'MANGA UP!': {},
  Netcomics: {},
  /* eslint-enable @typescript-eslint/naming-convention */
}

const mangaKoreanItems: Record<ReadableOnKorean, DropdownItem> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  Lezhin: {},
  Toomics: {},
  Justoon: {},
  'Naver Webtoon': {},
  KakaoPage: {},
  Bomtoon: {},
  Peanutoon: {},
  Comico: {},
  Comica: {},
  Bufftoon: {},
  'Naver Series': {},
  TOPTOON: {},
  'Kakao Webtoon': {},
  'Manyeo Comics': {},
  Anytoon: {},
  Mootoon: {},
  Ktoon: {},
  Onestory: {},
  'Battle Comics': {},
  Spooncomics: {},
  QToon: {},
  Manhwakyung: {},
  /* eslint-enable @typescript-eslint/naming-convention */
}

const mangaJapaneseItems: Record<ReadableOnJapanese, DropdownItem> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  Mangabox: {},
  ComicWalker: {},
  'Nico Nico Seiga': {},
  'Pixiv Comic': {},
  'Pixiv Novel': {},
  Comico: {},
  Piccoma: {},
  Webtoons: {},
  'Shonen Jump Plus': {},
  'Pocket Magazine': {},
  'Sunday Webry': {},
  'Ganma!': {},
  Cycomics: {},
  'Tonari no Young Jump': {},
  'Manga Park': {},
  'Comic Days': {},
  'Comic Zenon': {},
  'Manga Library Z': {},
  'Manga Love': {},
  Sukima: {},
  Comicess: {},
  'Manga Dokuha': {},
  Alphapolis: {},
  'Ura Sunday': {},
  'Comic Essay': {},
  Lezhin: {},
  'Kurage Bunch': {},
  'Comic Action': {},
  Lalatoon: {},
  'Newtype Web': {},
  'Comic Fuz': {},
  MangaToon: {},
  'Manga Cross': {},
  Comiplex: {},
  'Comic Meteor': {},
  'Comic Ride': {},
  Magcomi: {},
  'Web Ace': {},
  'Gangan Online': {},
  'Comic Trail': {},
  'Ciao Comics': {},
  Toomics: {},
  BeLTOON: {},
  /* eslint-enable @typescript-eslint/naming-convention */
}

const mangaChineseItems: Record<ReadableOnChinese, DropdownItem> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  'Tencent Comics': {},
  'KuaiKan Manhua': {},
  'Weibo Manhua': {},
  'Dajiaochong Manhua': {},
  'Manman Manhua': {},
  'Dongman Manhua': {},
  Manhuatai: {},
  'Kai Manhua': {},
  MangaToon: {},
  'Creative Comic Collection': {},
  Lalatoon: {},
  MKZhan: {},
  Bilibili: {},
  iQIYI: {},
  Webtoons: {},
  'Zhiyin Manke': {},
  Kanmanhua: {},
  TOPTOON: {},
  Toomics: {},
  'Kakao Webtoon': {},
  Bomtoon: {},
  Manhuadao: {},
  /* eslint-enable @typescript-eslint/naming-convention */
}

const mangaSpanishItems: Record<ReadableOnSpanish, DropdownItem> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  Lezhin: {},
  Webtoons: {},
  MangaToon: {},
  Toomics: {},
  /* eslint-enable @typescript-eslint/naming-convention */
}

const mangaThaiItems: Record<ReadableOnThai, DropdownItem> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  MangaToon: {},
  Webtoons: {},
  Comico: {},
  'Kakao Webtoon': {},
  Boomtoon: {},
  WeComics: {},
  /* eslint-enable @typescript-eslint/naming-convention */
}

const mangaFrenchItems: Record<ReadableOnFrench, DropdownItem> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  MangaToon: {},
  Webtoons: {},
  Tappytoon: {},
  Delitoon: {},
  Verytoon: {},
  Toomics: {},
  'Mangas.io': {},
  'Le Bontoon': {},
  /* eslint-enable @typescript-eslint/naming-convention */
}

const mangaGermanItems: Record<ReadableOnGerman, DropdownItem> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  Webtoons: {},
  Tappytoon: {},
  Toomics: {},
  'Delitoon B': {},
  /* eslint-enable @typescript-eslint/naming-convention */
}

const mangaItems: Record<ReadableOn, DropdownItem> = {
  ...mangaEnglishItems,
  ...mangaKoreanItems,
  ...mangaJapaneseItems,
  ...mangaChineseItems,
  ...mangaSpanishItems,
  ...mangaThaiItems,
  ...mangaFrenchItems,
  ...mangaGermanItems,
}

export function AvailableOnDropdown(): JSX.Element {
  const [keys, onChange] = useMultipleDropdownState(filtersSelector('licensedByIn'))
  const mediaType = useRecoilValue(filtersSelector('mediaType'))
  const [label, items] = useMemo(() => {
    switch (mediaType) {
      case MediaType.Anime:
        return ['Streaming On', animeItems]
      case MediaType.Manga:
        return ['Readable On', mangaItems]
      default:
        return ['Available On', { ...animeItems, ...mangaItems }]
    }
  }, [mediaType])

  return (
    <Dropdown>
      <Dropdown.Button flat>
        {label}
        {keys.length > 0 && `: ${keys[0]}`}
        {keys.length > 1 && ', ...'}
      </Dropdown.Button>
      <Dropdown.Menu
        items={Object.entries(items)}
        selectedKeys={keys}
        selectionMode="multiple"
        onSelectionChange={onChange}
      >
        {
          // @ts-expect-error Dropdown.Item does not support generics for now
          ([key, { icon }]: [AvailableOn, DropdownItem]) => (
            <Dropdown.Item key={key} icon={icon}>
              {key}
            </Dropdown.Item>
          )
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}
