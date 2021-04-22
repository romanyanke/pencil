import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import isUndefined from 'lodash/isUndefined'
import flatMap from 'lodash/flatMap'
import { pencilActions, pencilSelector } from './Pencil.actions'
import { PencilProps, PencilQuery } from './Pencil.interface'
import {
  getPencilsFromCacheByQuery,
  mapRequestToCacheId,
  mapRequestToCacheId as mapQueryToCacheId,
} from './Pencil.utils'
import { useFilter } from '../Filter/Filter.hooks'
import { requestFirstPage } from '../Gallery/Gallery.utils'

const usePencilStore = () => useSelector(pencilSelector)

export const useNormalizedPencils = () => usePencilStore().data

export const usePencilCache = (userQuery?: PencilQuery) => {
  const [currentFilter] = useFilter()
  const { cache } = usePencilStore()

  const filter = userQuery || currentFilter
  const query = (filter?.page ?? 0) > 1 ? filter : requestFirstPage(filter)
  const queryCacheId = mapQueryToCacheId({ query })
  const cacheItem = cache[queryCacheId]

  return cacheItem
}

export const usePencil = ({ id, query, queries }: PencilProps) => {
  const dispatch = useDispatch()
  const { cache } = usePencilStore()
  const normalized = useNormalizedPencils()
  const pencil = id ? normalized[id] : undefined
  const targetQueries = query ? [query] : queries ? queries : []
  const pencils = flatMap(targetQueries, query =>
    getPencilsFromCacheByQuery(query, cache, normalized),
  )

  useEffect(() => {
    const isNotCached = (query: PencilQuery) => isUndefined(cache[mapRequestToCacheId({ query })])

    if (id && !pencil) {
      dispatch(pencilActions.requestSingle({ id }))
    } else if (query && isNotCached(query)) {
      dispatch(pencilActions.requestList({ query }))
    } else if (queries) {
      queries.filter(isNotCached).forEach(query => {
        dispatch(pencilActions.requestList({ query }))
      })
    }
  }, [dispatch, id, query, queries, pencil, cache])

  return { pencil, pencils }
}
