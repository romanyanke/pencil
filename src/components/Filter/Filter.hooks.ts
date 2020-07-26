import isMatch from 'lodash/isMatch'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { AppStore } from './../../store'
import { filterActions } from './Filter.actions'
import { Filter } from './Filter.interface'
import { mapQueryStringToFilter, mapFilterToQueryString, getEmptyFilter } from './Filter.utils'
import { usePencilCache } from '../Pencil/Pencil.hooks'
import { useCountryRecord } from '../Taxonomy/Taxonomy.hooks'

export const useFilter = () => {
  const filter = useSelector<AppStore, Filter>(store => store.filter)
  const dispatch = useDispatch()

  const dispatchFilter = useCallback(
    (newFilter: Filter) => {
      if (!isMatch(filter, newFilter)) {
        dispatch(filterActions.set(newFilter))
      }
    },
    [filter, dispatch],
  )

  const updateFilter = useCallback(
    (update: Partial<Filter>) => dispatchFilter({ ...filter, ...update }),
    [dispatchFilter, filter],
  )

  const setFilter = useCallback(
    (update: Partial<Filter>) => dispatchFilter({ ...getEmptyFilter(), ...update }),
    [dispatchFilter],
  )

  const isFiltered = Boolean(filter.country || filter.tag)

  return [
    filter,
    {
      isFiltered,
      setFilter,
      updateFilter,
    },
  ] as const
}

export const useFilerQueryString = () => {
  const history = useHistory()
  const [filter, { updateFilter }] = useFilter()

  useEffect(() => {
    history.push({ search: mapFilterToQueryString(filter) })
  }, [filter, history])

  useEffect(() => {
    const unlisten = history.listen(({ search }, action) => {
      if (action === 'POP') {
        updateFilter(mapQueryStringToFilter(search))
      }
    })

    return unlisten
  }, [filter, history, updateFilter])
}

export const useFilterCountries = () => {
  const cache = usePencilCache()
  const countries = useCountryRecord()

  return isEmpty(countries) ? [] : (cache?.geo || []).map(geoId => countries[geoId])
}
