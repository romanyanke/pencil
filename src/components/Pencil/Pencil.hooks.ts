import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isUndefined } from 'util'
import { pencilActions } from './Pencil.actions'
import { Pencil, PencilAppStore, PencilProps, PencilQuery } from './Pencil.interface'
import {
  getPencilsFromCacheByQuery,
  mapRequestToCacheId,
  mapRequestToCacheId as mapQueryToCacheId,
} from './Pencil.utils'
import { AppStore } from '../../store'
import { useFilter } from '../Filter/Filter.hooks'
import { requestFirstPage } from '../Gallery/Gallery.utils'

const usePencilStore = () => useSelector<AppStore, PencilAppStore>(store => store.pencils)

export const usePecnilRequestStatus = () => usePencilStore().requestStatus
export const useNormalizedPencils = () => usePencilStore().normalized
export const usePencilCache = () => usePencilStore().cache

export const useCached = (userQuery?: PencilQuery) => {
  const [currentFilter] = useFilter()
  const cache = usePencilCache()

  const filter = userQuery || currentFilter
  const query = (filter?.page ?? 0) > 1 ? filter : requestFirstPage(filter)
  const queryCacheId = mapQueryToCacheId({ query })
  const cacheItem = cache[queryCacheId]

  return cacheItem
}

export const usePencil = ({ id, query, queries }: PencilProps) => {
  const dispatch = useDispatch()
  const requestStatus = usePecnilRequestStatus()
  const cache = usePencilCache()
  const normalized = useNormalizedPencils()
  const pencil = id ? normalized[id] : undefined
  const targetQueries = query ? [query] : queries ? queries : []
  const pencils = targetQueries.reduce<Pencil[]>(
    (acc, query) => [...acc, ...getPencilsFromCacheByQuery(query, cache, normalized)],
    [],
  )

  useEffect(() => {
    const isNotCached = (query: PencilQuery) => isUndefined(cache[mapRequestToCacheId({ query })])
    if (id && !pencil) {
      dispatch(pencilActions.requestSinglePencil.request({ id }))
    } else if (query && isNotCached(query)) {
      dispatch(pencilActions.requestPencilList.request({ query }))
    } else if (queries) {
      queries.filter(isNotCached).forEach(query => {
        dispatch(pencilActions.requestPencilList.request({ query }))
      })
    }
  }, [dispatch, id, query, queries, pencil, cache])

  return { requestStatus, pencil, pencils }
}
