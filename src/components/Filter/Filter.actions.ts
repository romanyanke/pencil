import { ActionType, createReducer, createStandardAction } from 'typesafe-actions'
import { Filter, FilterAppStore } from './Filter.interface'
import { getInitialFilter } from './Filter.utils'

const initialState: FilterAppStore = getInitialFilter()
const updateFilter = createStandardAction('filter:set')<Partial<Filter>>()
export const filterActions = { updateFilter }
type Actions = ActionType<typeof filterActions>

export default createReducer<FilterAppStore, Actions>(initialState).handleAction(
  updateFilter,
  (state, { payload }) => ({ ...state, ...payload }),
)
