import * as Types from './operations'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'

export const GetMediaDocument = gql`
  query getMedia($mediaId: Int) {
    Media(id: $mediaId) {
      title {
        userPreferred
        native
        english
      }
      siteUrl
    }
  }
`
export const SearchMediaDocument = gql`
  query searchMedia(
    $page: Int!
    $sort: [MediaSort]!
    $season: MediaSeason
    $seasonYear: Int
    $mediaType: MediaType
    $isAdult: Boolean
    $isOnList: Boolean
    $countryOfOrigin: CountryCode
    $search: String
    $startDate: FuzzyDateInt
    $startDateGreater: FuzzyDateInt
    $startDateLesser: FuzzyDateInt
    $endDate: FuzzyDateInt
    $endDateGreater: FuzzyDateInt
    $endDateLesser: FuzzyDateInt
    $format: MediaFormat
    $formatNot: MediaFormat
    $formatIn: [MediaFormat]
    $formatNotIn: [MediaFormat]
    $status: MediaStatus
    $statusNot: MediaStatus
    $statusIn: [MediaStatus]
    $statusNotIn: [MediaStatus]
    $episodes: Int
    $episodesGreater: Int
    $episodesLesser: Int
    $duration: Int
    $durationGreater: Int
    $durationLesser: Int
    $chapters: Int
    $chaptersGreater: Int
    $chaptersLesser: Int
    $volumes: Int
    $volumesGreater: Int
    $volumesLesser: Int
    $genre: String
    $genreIn: [String]
    $genreNotIn: [String]
    $tag: String
    $tagIn: [String]
    $tagNotIn: [String]
    $minimumTagRank: Int
    $tagCategory: String
    $tagCategoryIn: [String]
    $tagCategoryNotIn: [String]
    $licensedBy: String
    $licensedByIn: [String]
    $isLicensed: Boolean
    $averageScore: Int
    $averageScoreNot: Int
    $averageScoreGreater: Int
    $averageScoreLesser: Int
    $popularity: Int
    $popularityNot: Int
    $popularityGreater: Int
    $popularityLesser: Int
    $source: MediaSource
    $sourceIn: [MediaSource]
  ) {
    Page(page: $page, perPage: 50) {
      pageInfo {
        total
        lastPage
        hasNextPage
      }
      media(
        sort: $sort
        season: $season
        seasonYear: $seasonYear
        type: $mediaType
        isAdult: $isAdult
        onList: $isOnList
        countryOfOrigin: $countryOfOrigin
        search: $search
        startDate: $startDate
        startDate_greater: $startDateGreater
        startDate_lesser: $startDateLesser
        endDate: $endDate
        endDate_greater: $endDateGreater
        endDate_lesser: $endDateLesser
        format: $format
        format_not: $formatNot
        format_in: $formatIn
        format_not_in: $formatNotIn
        status: $status
        status_not: $statusNot
        status_in: $statusIn
        status_not_in: $statusNotIn
        episodes: $episodes
        episodes_greater: $episodesGreater
        episodes_lesser: $episodesLesser
        duration: $duration
        duration_greater: $durationGreater
        duration_lesser: $durationLesser
        chapters: $chapters
        chapters_greater: $chaptersGreater
        chapters_lesser: $chaptersLesser
        volumes: $volumes
        volumes_greater: $volumesGreater
        volumes_lesser: $volumesLesser
        genre: $genre
        genre_in: $genreIn
        genre_not_in: $genreNotIn
        tag: $tag
        tag_in: $tagIn
        tag_not_in: $tagNotIn
        minimumTagRank: $minimumTagRank
        tagCategory: $tagCategory
        tagCategory_in: $tagCategoryIn
        tagCategory_not_in: $tagCategoryNotIn
        licensedBy: $licensedBy
        licensedBy_in: $licensedByIn
        isLicensed: $isLicensed
        averageScore: $averageScore
        averageScore_not: $averageScoreNot
        averageScore_greater: $averageScoreGreater
        averageScore_lesser: $averageScoreLesser
        popularity: $popularity
        popularity_not: $popularityNot
        popularity_greater: $popularityGreater
        popularity_lesser: $popularityLesser
        source: $source
        source_in: $sourceIn
      ) {
        id
      }
    }
  }
`
export const GetViewerDocument = gql`
  query getViewer {
    Viewer {
      name
      siteUrl
      avatar {
        large
      }
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action()

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getMedia(
      variables?: Types.GetMediaQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<Types.GetMediaQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<Types.GetMediaQuery>(GetMediaDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getMedia',
        'query'
      )
    },
    searchMedia(
      variables: Types.SearchMediaQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<Types.SearchMediaQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<Types.SearchMediaQuery>(SearchMediaDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'searchMedia',
        'query'
      )
    },
    getViewer(
      variables?: Types.GetViewerQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<Types.GetViewerQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<Types.GetViewerQuery>(GetViewerDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getViewer',
        'query'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
