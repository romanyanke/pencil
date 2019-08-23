import { useDispatch, useSelector } from 'react-redux'
import { AppStore } from './../../store'
import { updateFilter } from './Filter.actions'
import { Filter } from './Filter.interface'

export const useFilter = (): [Filter, (update: Partial<Filter>) => void] => {
  const filter = useSelector<AppStore, Filter>(store => store.filter)
  const dispatch = useDispatch()
  const setFilter = (update: Partial<Filter>) => dispatch(updateFilter(update))

  return [filter, setFilter]
}
