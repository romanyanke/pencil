import { combineReducers } from 'redux'
import { taxonomyReducer } from './components/Taxonomy/Taxonomy.actions'
import { pencilReducer } from './components/Pencil/Pencil.actions'
import { filterReducer } from './components/Filter/Filter.actions'

export const rootReducer = combineReducers({
  filter: filterReducer,
  pencils: pencilReducer,
  taxonomy: taxonomyReducer,
})
