import qs from 'qs'
import { Reducer } from 'react'
import omitBy from 'lodash/omitBy'
import { AppState, AppStateActions } from './State.interface'

export const omitStateKey = (state: AppState, omitKey: keyof AppState): AppState =>
  omitBy(state, (value, key) => key === omitKey)

export const stateReducer: Reducer<AppState, AppStateActions> = (state, action) => {
  switch (action.type) {
    case 'reset':
      return action.state || {}

    case 'open:pencil':
      return { ...state, display: action.pencilId }

    case 'open:country':
      return { country: action.geoId }

    case 'open:tag':
      return { tag: action.tag }

    case 'close:pencil':
      return omitStateKey(state, 'display')

    case 'close:country':
      return omitStateKey(state, 'country')

    case 'close:tag':
      return omitStateKey(state, 'tag')

    default:
      return state
  }
}

export const mapAppStateToQuery = (state: AppState) => qs.stringify(state, { addQueryPrefix: true })

export const mapQueryToAppState = (search = window.location.search): AppState => {
  const state = qs.parse(search, { ignoreQueryPrefix: true })

  return validate(state)
}

const validate = (input: {}): AppState => {
  const inputAsState: AppState = input
  const out: AppState = {}

  if (inputAsState.display) {
    out.display = inputAsState.display
  }
  if (inputAsState.country) {
    out.country = inputAsState.country
  }
  if (inputAsState.tag) {
    out.tag = inputAsState.tag
  }

  return out
}

export const transformState = (state: AppState) => {
  const result = { ...state }

  const add = (update: AppState) => {
    Object.assign(result, update)

    return controls()
  }
  const omit = <K extends keyof AppState>(key: K) => {
    delete result[key]

    return controls()
  }
  const get = () => result
  const controls = () => ({ add, omit, get })

  return controls()
}
