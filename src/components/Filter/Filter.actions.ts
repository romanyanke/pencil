import { ActionType, createAction, createReducer } from 'typesafe-actions'
import { Filter, FilterAppStore } from './Filter.interface'
import { getInitialFilter } from './Filter.utils'

const initialState: FilterAppStore = getInitialFilter()
const setFilter = createAction('filter:set')<Filter>()
type Actions = ActionType<typeof filterActions>

export const filterActions = { setFilter }

export default createReducer<FilterAppStore, Actions>(initialState).handleAction(
  setFilter,
  (state, { payload }) => payload,
)
