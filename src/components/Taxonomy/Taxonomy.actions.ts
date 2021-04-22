import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TaxonomyAppStore as StoreTaxonomy, TaxonomyResponse } from './Taxonomy.interface'
import { RootState } from '../../store'

const initialState: StoreTaxonomy = {
  pending: true,
  failure: false,
  pencilCount: 0,
  countries: [],
  tags: [],
  statistic: { tags: 0, countries: 0, items: 0, pencils: 0 },
}

const taxonomy = createSlice({
  initialState,
  name: 'taxonomy',
  reducers: {
    request: state => {
      state.pending = true
    },
    success: (state, { payload }: PayloadAction<TaxonomyResponse>) => {
      state.failure = false
      state.pending = false
      state.countries = payload.countries
      state.pencilCount = payload.statistic.pencils
      state.statistic = payload.statistic
      state.tags = payload.tags
    },
    failure: state => {
      state.pending = false
      state.failure = true
    },
  },
})

export const taxonomyActions = taxonomy.actions
export const taxonomyReducer = taxonomy.reducer
export const taxonomySelector = (state: RootState) => state.taxonomy
