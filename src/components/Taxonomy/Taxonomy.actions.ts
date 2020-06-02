import { ActionType, createAsyncAction, createReducer } from 'typesafe-actions'
import produce from 'immer'
import { TaxonomyAppStore as StoreTaxonomy, TaxonomyResponse } from './Taxonomy.interface'

const requestTaxonomy = createAsyncAction(
  'Taxonomy:loading',
  'Taxonomy:success',
  'Taxonomy:failure',
)<undefined, TaxonomyResponse, undefined>()

const getInitialTaxonomyState = (): StoreTaxonomy => ({
  loading: true,
  failure: false,
  pencilCount: 0,
  countries: [],
  tags: [],
})

export const taxonomyActions = { requestTaxonomy }
export type TaxonomyActions = ActionType<typeof taxonomyActions>

export default createReducer<StoreTaxonomy, TaxonomyActions>(getInitialTaxonomyState())
  .handleAction(requestTaxonomy.success, (state, { payload }) => ({
    loading: false,
    failure: false,
    pencilCount: payload.meta.pencils,
    countries: payload.taxonomy.countries,
    tags: payload.taxonomy.tags,
  }))
  .handleAction(requestTaxonomy.failure, state =>
    produce(state, draft => {
      draft.loading = false
      draft.failure = true
    }),
  )
