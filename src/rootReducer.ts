import { combineReducers } from 'redux'
import { filterReducer as filter } from './components/Filter'
import { pencilReducer as pencils } from './components/Pencil'
import { taxonomyReducer as taxonomy } from './components/Taxonomy'

const rootReducer = combineReducers({ taxonomy, pencils, filter })

export default rootReducer
