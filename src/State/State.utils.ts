import qs from 'qs'
import { AppState } from './State.interface'

export const mapAppStateToQuery = (state: AppState) => qs.stringify(state, { addQueryPrefix: true })

export const mapQueryToAppState = (search = window.location.search) => {
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
