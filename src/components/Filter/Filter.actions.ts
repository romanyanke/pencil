import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Filter } from './Filter.interface'
import { mapQueryStringToFilter } from './Filter.utils'
import { RootState } from '../../store'

const initialState = mapQueryStringToFilter()

const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<Filter>) => payload,
  },
})

export const filterActions = filter.actions
export const filterReducer = filter.reducer
export const filterSelector = (state: RootState) => state.filter
