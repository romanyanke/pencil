import { configureStore, DeepPartial } from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic } from './rootEpic'
import { rootReducer } from './rootReducer'

export type RootState = ReturnType<typeof store.getState>

const epicMiddleware = createEpicMiddleware()
export const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
})

epicMiddleware.run(rootEpic)

export const createTestStore = (preloadedState?: DeepPartial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  })
