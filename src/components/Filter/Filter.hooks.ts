import { useDispatch, useSelector } from 'react-redux'
import { useCached, useNormalizedPencils } from '../Pencil/Pencil.hooks'
import { AppStore } from './../../store'
import { filterActions } from './Filter.actions'
import { Filter } from './Filter.interface'
import { useCallback } from 'react'
import { isMatch } from 'lodash'

export const useFilter = () => {
  const filter = useSelector<AppStore, Filter>(store => store.filter)
  const dispatch = useDispatch()
  const setFilter = useCallback(
    (update: Partial<Filter>) => {
      if (!isMatch(filter, update)) {
        dispatch(filterActions.updateFilter(update))
      }
    },
    [filter, dispatch],
  )

  return [filter, setFilter] as const
}

export const useSiblings = (pencilId: string) => {
  const cache = useCached()
  const normalized = useNormalizedPencils()

  if (cache) {
    const currentIndex = cache.ids.findIndex(id => id === pencilId)
    const prevId = cache.ids[currentIndex - 1]
    const nextId = cache.ids[currentIndex + 1]

    const prevPencil = normalized[prevId] || null
    const nextPencil = normalized[nextId] || null

    return [prevPencil, nextPencil]
  }

  return [null, null]
}
