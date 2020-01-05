import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from './rootEpic'
import rootReducer from './rootReducer'

const epicMiddleware = createEpicMiddleware()
const store: Store<AppStore> = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(epicMiddleware)),
)
epicMiddleware.run(rootEpic)

export type AppStore = ReturnType<typeof rootReducer>

export const createTestStore = (initialState?: RecursivePartial<AppStore>) =>
  createStore(rootReducer, initialState as AppStore)

export default store
