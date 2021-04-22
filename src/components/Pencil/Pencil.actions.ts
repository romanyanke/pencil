import merge from 'lodash/merge'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  PencilRootState,
  PencilListResponse,
  PencilSingleResponse,
  PencilSingleRequest,
  PencilListRequest,
} from './Pencil.interface'
import { mapPencilsResponseToStore } from './Pencil.utils'
import { RootState } from '../../store'

const initialState: PencilRootState = {
  cache: {},
  data: {},
}

const pencil = createSlice({
  name: 'pencil',
  initialState,
  reducers: {
    requestSingle: (state, action: PayloadAction<PencilSingleRequest>) => {},
    requestList: (state, action: PayloadAction<PencilListRequest>) => {},

    single: (state, { payload }: PayloadAction<PencilSingleResponse>) => {
      state.data[payload.id] = payload
    },

    list: (state, { payload }: PayloadAction<PencilListResponse>) => {
      merge(state, mapPencilsResponseToStore(payload))
    },
  },
})

export const pencilActions = pencil.actions
export const pencilReducer = pencil.reducer

export const pencilSelector = (state: RootState) => state.pencils
