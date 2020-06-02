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
      const newFilter = { ...filter, ...update }
      if (!isMatch(filter, newFilter)) {
        dispatch(filterActions.setFilter(newFilter))
      }
    },
    [filter, dispatch],
  )

  const setCountry = useCallback((country: string) => setFilter({ country, tag: '' }), [setFilter])
  const setTag = useCallback((tag: string) => setFilter({ tag, country: '' }), [setFilter])
  const openPencil = useCallback((pencilId: string) => setFilter({ display: pencilId }), [
    setFilter,
  ])
  const clearCountry = useCallback(() => setCountry(''), [setCountry])
  const clearTag = useCallback(() => setTag(''), [setTag])
  const closePencil = useCallback(() => openPencil(''), [openPencil])

  return [
    filter,
    {
      setFilter,
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
  const [filter, { setFilter }] = useFilter()

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
