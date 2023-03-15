import * as Types from './types'

export type GetMediaQueryVariables = Types.Exact<{
  mediaId?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type GetMediaQuery = {
  Media?: {
    siteUrl?: string | null
    title?: { userPreferred?: string | null; native?: string | null; english?: string | null } | null
  } | null
}

export type SearchMediaQueryVariables = Types.Exact<{
  page: Types.Scalars['Int']
  sort: Array<Types.InputMaybe<Types.MediaSort>> | Types.InputMaybe<Types.MediaSort>
  season?: Types.InputMaybe<Types.MediaSeason>
  seasonYear?: Types.InputMaybe<Types.Scalars['Int']>
  mediaType?: Types.InputMaybe<Types.MediaType>
  isAdult?: Types.InputMaybe<Types.Scalars['Boolean']>
  isOnList?: Types.InputMaybe<Types.Scalars['Boolean']>
  countryOfOrigin?: Types.InputMaybe<Types.Scalars['CountryCode']>
  search?: Types.InputMaybe<Types.Scalars['String']>
  startDate?: Types.InputMaybe<Types.Scalars['FuzzyDateInt']>
  startDateGreater?: Types.InputMaybe<Types.Scalars['FuzzyDateInt']>
  startDateLesser?: Types.InputMaybe<Types.Scalars['FuzzyDateInt']>
  endDate?: Types.InputMaybe<Types.Scalars['FuzzyDateInt']>
  endDateGreater?: Types.InputMaybe<Types.Scalars['FuzzyDateInt']>
  endDateLesser?: Types.InputMaybe<Types.Scalars['FuzzyDateInt']>
  format?: Types.InputMaybe<Types.MediaFormat>
  formatNot?: Types.InputMaybe<Types.MediaFormat>
  formatIn?: Types.InputMaybe<Array<Types.InputMaybe<Types.MediaFormat>> | Types.InputMaybe<Types.MediaFormat>>
  formatNotIn?: Types.InputMaybe<Array<Types.InputMaybe<Types.MediaFormat>> | Types.InputMaybe<Types.MediaFormat>>
  status?: Types.InputMaybe<Types.MediaStatus>
  statusNot?: Types.InputMaybe<Types.MediaStatus>
  statusIn?: Types.InputMaybe<Array<Types.InputMaybe<Types.MediaStatus>> | Types.InputMaybe<Types.MediaStatus>>
  statusNotIn?: Types.InputMaybe<Array<Types.InputMaybe<Types.MediaStatus>> | Types.InputMaybe<Types.MediaStatus>>
  episodes?: Types.InputMaybe<Types.Scalars['Int']>
  episodesGreater?: Types.InputMaybe<Types.Scalars['Int']>
  episodesLesser?: Types.InputMaybe<Types.Scalars['Int']>
  duration?: Types.InputMaybe<Types.Scalars['Int']>
  durationGreater?: Types.InputMaybe<Types.Scalars['Int']>
  durationLesser?: Types.InputMaybe<Types.Scalars['Int']>
  chapters?: Types.InputMaybe<Types.Scalars['Int']>
  chaptersGreater?: Types.InputMaybe<Types.Scalars['Int']>
  chaptersLesser?: Types.InputMaybe<Types.Scalars['Int']>
  volumes?: Types.InputMaybe<Types.Scalars['Int']>
  volumesGreater?: Types.InputMaybe<Types.Scalars['Int']>
  volumesLesser?: Types.InputMaybe<Types.Scalars['Int']>
  genre?: Types.InputMaybe<Types.Scalars['String']>
  genreIn?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>
  >
  genreNotIn?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>
  >
  tag?: Types.InputMaybe<Types.Scalars['String']>
  tagIn?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>
  tagNotIn?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>
  >
  minimumTagRank?: Types.InputMaybe<Types.Scalars['Int']>
  tagCategory?: Types.InputMaybe<Types.Scalars['String']>
  tagCategoryIn?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>
  >
  tagCategoryNotIn?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>
  >
  licensedBy?: Types.InputMaybe<Types.Scalars['String']>
  licensedByIn?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>
  >
  isLicensed?: Types.InputMaybe<Types.Scalars['Boolean']>
  averageScore?: Types.InputMaybe<Types.Scalars['Int']>
  averageScoreNot?: Types.InputMaybe<Types.Scalars['Int']>
  averageScoreGreater?: Types.InputMaybe<Types.Scalars['Int']>
  averageScoreLesser?: Types.InputMaybe<Types.Scalars['Int']>
  popularity?: Types.InputMaybe<Types.Scalars['Int']>
  popularityNot?: Types.InputMaybe<Types.Scalars['Int']>
  popularityGreater?: Types.InputMaybe<Types.Scalars['Int']>
  popularityLesser?: Types.InputMaybe<Types.Scalars['Int']>
  source?: Types.InputMaybe<Types.MediaSource>
  sourceIn?: Types.InputMaybe<Array<Types.InputMaybe<Types.MediaSource>> | Types.InputMaybe<Types.MediaSource>>
}>

export type SearchMediaQuery = {
  Page?: {
    pageInfo?: { total?: number | null; lastPage?: number | null; hasNextPage?: boolean | null } | null
    media?: Array<{ id: number } | null> | null
  } | null
}

export type GetViewerQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetViewerQuery = {
  Viewer?: { name: string; siteUrl?: string | null; avatar?: { large?: string | null } | null } | null
}
