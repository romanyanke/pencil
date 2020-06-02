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
  const updateFilter = useCallback(
    (update: Partial<Filter>) => {
      const newFilter = { ...filter, ...update }
      if (!isMatch(filter, newFilter)) {
        dispatch(filterActions.set(newFilter))
      }
    },
    [filter, dispatch],
  )
  const setCountry = useCallback((country: string) => updateFilter({ country, tag: '' }), [
    updateFilter,
  ])
  const setTag = useCallback((tag: string) => updateFilter({ tag, country: '' }), [updateFilter])
  const openPencil = useCallback((pencilId: string) => updateFilter({ display: pencilId }), [
    updateFilter,
  ])
  const clearCountry = useCallback(() => setCountry(''), [setCountry])
  const clearTag = useCallback(() => setTag(''), [setTag])
  const closePencil = useCallback(() => openPencil(''), [openPencil])

  return [
    filter,
    {
      updateFilter,
      setCountry,
      setTag,
      openPencil,
      clearCountry,
      clearTag,
      closePencil,
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
