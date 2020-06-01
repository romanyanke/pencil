import isMatch from 'lodash/isMatch'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore } from './../../store'
import { filterActions } from './Filter.actions'
import { Filter } from './Filter.interface'

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
