import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { appConfig } from './appConfig'
import { FeedApiPayload, FeedApiResponse, PencilData } from './Feed/Feed.interface'
import { mapPayloadToPath } from './Feed/Feed.utils'
import { TaxonomyApiResponse } from './Taxonomy/Taxonomy.interface'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: appConfig.pencilBoxUrl }),
  endpoints: builder => ({
    taxonomy: builder.query<TaxonomyApiResponse, void>({
      query: () => `taxonomy/`,
    }),
    feed: builder.query<FeedApiResponse, void | FeedApiPayload>({
      query: mapPayloadToPath,
    }),
    pencil: builder.query<PencilData, string>({
      query: pencilId => `pencil/${pencilId}/`,
    }),
  }),
})

export const { usePencilQuery, useFeedQuery, useLazyFeedQuery, useTaxonomyQuery } = api
