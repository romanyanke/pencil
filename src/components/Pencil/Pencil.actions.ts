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

export const requestSinglePencil = createAsyncAction(
  'pencil-single:pending',
  'pencil-single:fulfilled',
  'pencil-single:rejected',
)<PencilSingleRequest, PencilSingleResponse, undefined>()

export const requestPencilList = createAsyncAction(
  'pencil-list:pending',
  'pencil-list:fulfilled',
  'pencil-list:rejected',
)<PencilsListRequest, PencilListResponse, undefined>()

const actions = { requestPencils: requestPencilList, requestPencil: requestSinglePencil }
type Actions = ActionType<typeof actions>

export default createReducer<PencilAppStore, Actions>(initialState)
  .handleAction([requestPencilList.request, requestSinglePencil.request], state => ({
    ...state,
    requestStatus: getRequestStatus().pending,
  }))
  .handleAction([requestPencilList.failure, requestSinglePencil.failure], state => ({
    ...state,
    requestStatus: getRequestStatus().rejected,
  }))
  .handleAction(requestPencilList.success, (state, { payload }) => {
    const { cache, normalized } = getCacheAndNormilizedFromList(payload)
    return {
      ...state,
      cache: { ...state.cache, ...cache },
      normalized: { ...state.normalized, ...normalized },
      requestStatus: getRequestStatus().fulfilled,
    }
  })
  .handleAction(requestSinglePencil.success, (state, { payload: pencil }) => ({
    ...state,
    normalized: {
      ...state.normalized,
      [pencil.id]: pencil,
    },
    requestStatus: getRequestStatus().fulfilled,
  }))
