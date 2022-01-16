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

    if (!args || args.tag !== tag || args.country !== country) {
      trigger({ page: 1, tag, country })
        .unwrap()
        .then(({ data, geo = [] }) => {
          setPencils(data)
          setActiveGeo(geo)
        })
    }
  }, [trigger, query.originalArgs, state, activeGeo.length])

  const loadNextPage = useCallback(async () => {
    if (!hasNextPage || query.isLoading) {
      return
    }
    const { data } = await trigger({ ...state, page: nextPage }).unwrap()

    setPencils(current => [...current, ...data])
  }, [hasNextPage, query.isLoading, trigger, state, nextPage])

  return { query, loadNextPage, pencils, activeGeo, hasNextPage }
}
