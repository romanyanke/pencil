import { ActionType, createReducer, createStandardAction } from 'typesafe-actions'
import { Filter, FilterAppStore } from './Filter.interface'
import { getInitialFilter } from './Filter.utils'

const initialState: FilterAppStore = getInitialFilter()
export const updateFilter = createStandardAction('filter:set')<Partial<Filter>>()
const actions = { updateFilter }
type Actions = ActionType<typeof actions>

export default createReducer<FilterAppStore, Actions>(initialState).handleAction(
  updateFilter,
  (state, { payload }) => ({
    ...state,
    ...payload,
  }),
)
