import { createContext, useContext, useEffect, useReducer } from 'react'
import { AppState, AppStateControls } from './State.interface'
import { mapAppStateToQuery, mapQueryToAppState, stateReducer } from './State.utils'

export const StateContext = createContext<AppStateControls>(null as any)

export const useAppState = () => useContext(StateContext)

export const useStateContextValue = () => {
  const [state, dispatch] = useReducer(stateReducer, mapQueryToAppState())

  const isFilterApplied = Boolean(state.tag || state.country)
  const resetFilter = (state: AppState = {}) => dispatch({ type: 'reset', state })

  const openPencil = (pencilId: string) => dispatch({ type: 'open:pencil', pencilId })
  const openCountry = (geoId: string) => dispatch({ type: 'open:country', geoId })
  const openTag = (tag: string) => dispatch({ type: 'open:tag', tag })

  const closePencil = () => dispatch({ type: 'close:pencil' })
  const closeCountry = () => dispatch({ type: 'close:country' })
  const closeTag = () => dispatch({ type: 'close:tag' })

  return {
    closeCountry,
    closePencil,
    closeTag,
    isFilterApplied,
    openCountry,
    openPencil,
    openTag,
    resetFilter,
    state,
  }
}

export const useStateInUrl = ({ state, resetFilter }: AppStateControls) => {
  useEffect(() => {
    const cb = () => resetFilter(mapQueryToAppState())
    window.addEventListener('popstate', cb)

    return () => {
      window.removeEventListener('popstate', cb)
    }
  }, [resetFilter])

  useEffect(() => {
    const newSearch = mapAppStateToQuery(state)

    if (newSearch !== window.location.search) {
      window.history.pushState(state, JSON.stringify(state), newSearch || window.location.pathname)
    }
  }, [state])
}
