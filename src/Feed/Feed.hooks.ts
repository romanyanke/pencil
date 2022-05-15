import { useCallback, useContext, useEffect, useState } from 'react'
import { FeedContext } from './Feed'
import { FeedPencil } from './Feed.interface'
import { useLazyFeedQuery } from '../api'
import { useAppState } from '../State/State.hooks'

export const useFeed = () => useContext(FeedContext)

export const useFeedContextValue = () => {
  const [trigger, query] = useLazyFeedQuery()
  const { state } = useAppState()
  const [pencils, setPencils] = useState<FeedPencil[]>([])
  const [activeGeo, setActiveGeo] = useState<string[]>([])

  const pages = query.data?.pages || { currentPage: 1, totalPages: 1 }
  const hasNextPage = pages.currentPage < pages.totalPages
  const nextPage = hasNextPage ? pages.currentPage + 1 : pages.currentPage

  useEffect(() => {
    const args = query.originalArgs
    const { tag, country } = state
    const stateUnchanged = args ? args.tag === tag && args.country === country : false

    if (stateUnchanged || query.isFetching) {
      return
    }

    trigger({ tag, country, page: 1 })
      .unwrap()
      .then(({ data, geo = [] }) => {
        setPencils(data)
        setActiveGeo(geo)
      })
  }, [query.isFetching, query.originalArgs, state, trigger])

  const loadNextPage = useCallback(() => {
    if (!hasNextPage || query.isFetching) {
      return
    }
    trigger({ ...state, page: nextPage })
      .unwrap()
      .then(({ data }) => setPencils(current => [...current, ...data]))
  }, [hasNextPage, query.isFetching, trigger, state, nextPage])

  return { query, loadNextPage, pencils, activeGeo, hasNextPage }
}
