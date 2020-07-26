import { ActionType, createAsyncAction, createReducer } from 'typesafe-actions'
import produce from 'immer'
import { TaxonomyAppStore as StoreTaxonomy, TaxonomyResponse } from './Taxonomy.interface'

const requestTaxonomy = createAsyncAction(
  'Taxonomy:pending',
  'Taxonomy:success',
  'Taxonomy:failure',
)<undefined, TaxonomyResponse, undefined>()

const getInitialTaxonomyState = (): StoreTaxonomy => ({
  pending: true,
  failure: false,
  pencilCount: 0,
  countries: [],
  tags: [],
  statistic: { tags: 0, countries: 0, items: 0, pencils: 0 },
})

export const taxonomyActions = { requestTaxonomy }
export type TaxonomyActions = ActionType<typeof taxonomyActions>

export const taxonomyReducer = createReducer<StoreTaxonomy, TaxonomyActions>(
  getInitialTaxonomyState(),
)
  .handleAction(requestTaxonomy.success, (state, { payload }) => ({
    failure: false,
    pending: false,
    countries: payload.countries,
    pencilCount: payload.statistic.pencils,
    statistic: payload.statistic,
    tags: payload.tags,
  }))
  .handleAction(requestTaxonomy.failure, () =>
    produce(getInitialTaxonomyState(), draft => {
      draft.pending = false
      draft.failure = true
    }),
  )
