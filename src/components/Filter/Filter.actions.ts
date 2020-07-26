import { ActionType, createAction, createReducer } from 'typesafe-actions'
import { Filter, FilterAppStore } from './Filter.interface'
import { mapQueryStringToFilter } from './Filter.utils'

const initialState: FilterAppStore = mapQueryStringToFilter()
const set = createAction('Filter:set')<Filter>()
type Actions = ActionType<typeof filterActions>

export const filterActions = { set }

export const filterReducer = createReducer<FilterAppStore, Actions>(initialState).handleAction(
  set,
  (state, { payload }) => payload,
)
