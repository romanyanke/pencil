import { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FeedContext } from './Feed'
import { FeedPencil } from './Feed.interface'
import { useLazyFeedQuery } from '../api'
import { useAppState } from '../State/State.hooks'

export const useFeed = () => useContext(FeedContext)

export const useFeedContextValue = () => {
  const [trigger, query] = useLazyFeedQuery()
  const { i18n } = useTranslation()

  const { state } = useAppState()
  const [pencils, setPencils] = useState<FeedPencil[]>([])
  const [activeGeo, setActiveGeo] = useState<string[]>([])

  const pages = query.data?.pages || { currentPage: 1, totalPages: 1 }
  const hasNextPage = pages.currentPage < pages.totalPages
  const nextPage = hasNextPage ? pages.currentPage + 1 : pages.currentPage
  const locale = i18n.language

  useEffect(() => {
    const args = query.originalArgs
    const { tag, country } = state
    const stateUnchanged = args ? args.tag === tag && args.country === country : false

    if (stateUnchanged || query.isFetching) {
      return
    }

    trigger({ tag, country, page: 1, locale })
      .unwrap()
      .then(({ data, geo = [] }) => {
        setPencils(data)
        setActiveGeo(geo)
      })
  }, [locale, query.isFetching, query.originalArgs, state, trigger])

  const loadNextPage = useCallback(() => {
    if (!hasNextPage || query.isFetching) {
      return
    }
    trigger({ ...state, page: nextPage, locale })
      .unwrap()
      .then(({ data }) => setPencils(current => [...current, ...data]))
  }, [hasNextPage, query.isFetching, trigger, state, nextPage, locale])

  return { query, loadNextPage, pencils, activeGeo, hasNextPage }
}
