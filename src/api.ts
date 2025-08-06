import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FeedApiPayload, FeedApiResponse, PencilData } from './Feed/Feed.interface'
import { mapPayloadToPath } from './Feed/Feed.utils'
import { useLanguage } from './LanguageProvider/LanguageProvider.hooks'
import { TaxonomyApiResponse } from './Taxonomy/Taxonomy.interface'

type Localized<T = {}> = T & { language: string }
const getPrefixedApi = (locale: string, pathname: string) =>
  `${locale === 'en' ? 'en/' : ''}${pathname}/`
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_PENCIL_BOX_URL }),
  endpoints: builder => ({
    taxonomy: builder.query<TaxonomyApiResponse, Localized>({
      query: ({ language: locale }) => getPrefixedApi(locale, 'collection'),
    }),
    feed: builder.query<FeedApiResponse, void | FeedApiPayload>({
      query: mapPayloadToPath,
    }),
    pencil: builder.query<PencilData, Localized<{ id: string }>>({
      query: ({ id, language: locale }) => getPrefixedApi(locale, `pencil/${id}`),
    }),
  }),
})

const { usePencilQuery } = api
export const { useFeedQuery, useLazyFeedQuery, useTaxonomyQuery } = api

export const usePencil = (pencilId?: string) => {
  const { language } = useLanguage()

  return usePencilQuery({ id: pencilId!, language }, { skip: !pencilId })
}
