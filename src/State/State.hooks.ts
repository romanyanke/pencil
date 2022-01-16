import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { mapAppStateToQuery, mapQueryToAppState, transformState } from './State.utils'

export const StateContext = createContext<ReturnType<typeof useStateContextValue>>(null as any)

export const useAppState = () => useContext(StateContext)

export const useStateContextValue = () => {
  const [state, setState] = useState(mapQueryToAppState())
  const isFilterApplied = Boolean(state.tag || state.country)

  const resetFilter = useCallback(() => setState({}), [])

  useEffect(() => {
    const cb = () => setState(mapQueryToAppState())
    window.addEventListener('popstate', cb)

    return () => {
      window.removeEventListener('popstate', cb)
    }
  }, [])

  useEffect(() => {
    const newSearch = mapAppStateToQuery(state)

    if (newSearch !== window.location.search) {
      window.history.pushState(state, JSON.stringify(state), newSearch || window.location.pathname)
    }
  }, [state])

  const openPencil = useCallback(
    (pencilId: string) => setState(state => transformState(state).add({ display: pencilId }).get()),
    [setState],
  )
  const openCountry = useCallback(
    (country: string) =>
      setState(state => transformState(state).omit('tag').add({ country }).get()),
    [],
  )
  const openTag = useCallback(
    (tag: string) => setState(state => transformState(state).omit('country').add({ tag }).get()),

    [],
  )
  const closePencil = useCallback(
    () => setState(state => transformState(state).omit('display').get()),
    [setState],
  )
  const closeCountry = useCallback(
    () => setState(state => transformState(state).omit('country').get()),
    [setState],
  )
  const closeTag = useCallback(
    () => setState(state => transformState(state).omit('tag').get()),
    [setState],
  )

  return {
    closeCountry,
    closePencil,
    closeTag,
    isFilterApplied,
    openCountry,
    openPencil,
    openTag,
    resetFilter,
    setState,
    state,
  }
}
