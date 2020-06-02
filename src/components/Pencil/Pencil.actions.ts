import { ActionType, createAsyncAction, createReducer } from 'typesafe-actions'
import produce from 'immer'
import merge from 'lodash/merge'
import {
  PencilAppStore,
  PencilListResponse,
  PencilSingleRequest,
  PencilSingleResponse,
  PencilsListRequest,
} from './Pencil.interface'
import { mapPancilsResponseToStore } from './Pencil.utils'

const getInitialPencilState = (): PencilAppStore => ({
  cache: {},
  data: {},
})

const requestSinglePencil = createAsyncAction(
  'Pencil/single:loading',
  'Pencil/single:success',
  'Pencil/single:failure',
)<PencilSingleRequest, PencilSingleResponse, undefined>()

const requestPencilList = createAsyncAction(
  'Pencil/list:loading',
  'Pencil/list:success',
  'Pencil/list:failure',
)<PencilsListRequest, PencilListResponse, undefined>()

export const pencilActions = { requestPencilList, requestSinglePencil }
export type PencilActions = ActionType<typeof pencilActions>

export default createReducer<PencilAppStore, PencilActions>(getInitialPencilState())
  .handleAction(requestPencilList.success, (state, { payload }) =>
    produce(state, draft => {
      merge(draft, mapPancilsResponseToStore(payload))
    }),
  )
  .handleAction(requestSinglePencil.success, (state, { payload }) =>
    produce(state, draft => {
      draft.data[payload.id] = payload
    }),
  )
