import { ActionType, createAsyncAction, createReducer } from 'typesafe-actions'
import { getRequestStatus } from '../../modules/requestStatus'
import {
  PencilAppStore,
  PencilListResponse,
  PencilSingleRequest,
  PencilSingleResponse,
  PencilsListRequest,
} from './Pencil.interface'
import { getCacheAndNormilizedFromList } from './Pencil.utils'

const initialState: PencilAppStore = {
  requestStatus: getRequestStatus().idle,
  cache: {},
  normalized: {},
}

const requestSinglePencil = createAsyncAction(
  'pencil-single:pending',
  'pencil-single:fulfilled',
  'pencil-single:rejected',
)<PencilSingleRequest, PencilSingleResponse, undefined>()

const requestPencilList = createAsyncAction(
  'pencil-list:pending',
  'pencil-list:fulfilled',
  'pencil-list:rejected',
)<PencilsListRequest, PencilListResponse, undefined>()

export const pencilActions = { requestPencilList, requestSinglePencil }
type Actions = ActionType<typeof pencilActions>

export default createReducer<PencilAppStore, Actions>(initialState)
  .handleAction([requestPencilList.request, requestSinglePencil.request], state => ({
    requestStatus: getRequestStatus().pending,
    cache: state.cache,
    normalized: state.normalized,
  }))
  .handleAction([requestPencilList.failure, requestSinglePencil.failure], state => ({
    requestStatus: getRequestStatus().rejected,
    cache: state.cache,
    normalized: state.normalized,
  }))
  .handleAction(requestPencilList.success, (state, { payload }) => {
    const { cache, normalized } = getCacheAndNormilizedFromList(payload)
    return {
      cache: { ...state.cache, ...cache },
      normalized: { ...state.normalized, ...normalized },
      requestStatus: getRequestStatus().fulfilled,
    }
  })
  .handleAction(requestSinglePencil.success, (state, { payload: pencil }) => ({
    normalized: { ...state.normalized, [pencil.id]: pencil },
    requestStatus: getRequestStatus().fulfilled,
    cache: state.cache,
  }))
