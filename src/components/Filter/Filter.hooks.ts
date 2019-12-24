import { useDispatch, useSelector } from 'react-redux'
import { useCached, useNormalizedPencils } from '../Pencil/Pencil.hooks'
import { Pencil } from '../Pencil/Pencil.interface'
import { AppStore } from './../../store'
import { filterActions } from './Filter.actions'
import { Filter } from './Filter.interface'

export const useFilter = (): [Filter, (update: Partial<Filter>) => void] => {
  const filter = useSelector<AppStore, Filter>(store => store.filter)
  const dispatch = useDispatch()
  const setFilter = (update: Partial<Filter>) => dispatch(filterActions.updateFilter(update))

  return [filter, setFilter]
}

type NullablePencil = Pencil | null
export const useSiblings = (pencilId: string): [NullablePencil, NullablePencil] => {
  const cache = useCached()
  const normalized = useNormalizedPencils()
  try {
    if (pencilId && cache) {
      const currentIndex = cache.ids.findIndex(id => id === pencilId)
      const prevId = cache.ids[currentIndex - 1]
      const nextId = cache.ids[currentIndex + 1]

      const prevPencil = normalized[prevId] || null
      const nextPencil = normalized[nextId] || null

      return [prevPencil, nextPencil]
    }

    return [null, null]
  } catch (e) {
    throw new Error(pencilId)
  }
}
