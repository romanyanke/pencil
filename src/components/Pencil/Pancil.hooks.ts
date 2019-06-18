import { useSelector } from 'react-redux'
import { AppStore } from '../../store'
import { useFilter } from '../Filter/Filter.hooks'
import { requestFirstPage } from '../Gallery/Gallery.utils'
import { PencilAppStore, PencilQuery } from './Pencil.interface'
import { mapRequestToCacheId as mapQueryToCacheId } from './Pencil.utils'

const usePencil = () => useSelector<AppStore, PencilAppStore>(store => store.pencils)

export const usePecnilRequestStatus = () => usePencil().requestStatus
export const useNormalizedPencils = () => usePencil().normalized
export const usePencilCache = () => usePencil().cache

export const useCached = (userQuery?: PencilQuery) => {
  const [currentFilter] = useFilter()
  const filter = userQuery || currentFilter
  const query = filter && filter.page && filter.page > 1 ? filter : requestFirstPage(filter)
  const queryCacheId = mapQueryToCacheId({ query })
  const cache = usePencilCache()
  const cacheItem = cache[queryCacheId]
  return cacheItem
}
