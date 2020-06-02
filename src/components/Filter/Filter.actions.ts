import { ActionType, createAction, createReducer } from 'typesafe-actions'
import { Filter, FilterAppStore } from './Filter.interface'
import { mapQueryStringToFilter } from './Filter.utils'

const initialState: FilterAppStore = mapQueryStringToFilter()
const update = createAction('Filter:update')<Partial<Filter>>()
const set = createAction('Filter:set')<Filter>()
type Actions = ActionType<typeof filterActions>

export const filterActions = { set, update }

export default createReducer<FilterAppStore, Actions>(initialState)
  .handleAction(set, (state, { payload }) => payload)
  .handleAction(update, (state, { payload }) => ({ ...state, ...payload }))
