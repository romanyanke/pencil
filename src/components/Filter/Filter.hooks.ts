import isMatch from 'lodash/isMatch'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AppStore } from './../../store'
import { filterActions } from './Filter.actions'
import { Filter } from './Filter.interface'
import { mapQueryStringToFilter, mapFilterToQueryString } from './Filter.utils'

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

export const useFilerQueryString = () => {
  const history = useHistory()
  const [filter, setFilter] = useFilter()

  useEffect(() => {
    if (mapFilterToQueryString(filter) !== window.location.search) {
      history.push(mapFilterToQueryString(filter))
    }
  }, [filter, history])

  useEffect(() => {
    const unlisten = history.listen(({ search }, action) => {
      if (action === 'POP') {
        setFilter(mapQueryStringToFilter(search))
      }
    })

    return unlisten
  }, [filter, history, setFilter])
}
