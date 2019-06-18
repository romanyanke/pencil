import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import { filterReducer } from './components/Filter'
import { pencilReducer } from './components/Pencil'
import { taxonomyReducer } from './components/Taxonomy'
import rootEpic from './epics'

const epicMiddleware = createEpicMiddleware()
const rootReducer = combineReducers({
  taxonomy: taxonomyReducer,
  pencils: pencilReducer,
  filter: filterReducer,
})
const store: Store<AppStore> = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(epicMiddleware)),
)
epicMiddleware.run(rootEpic)

export type AppStore = ReturnType<typeof rootReducer>

export default store
