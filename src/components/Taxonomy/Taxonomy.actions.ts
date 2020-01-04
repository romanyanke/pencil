import { ActionType, createAsyncAction, createReducer } from 'typesafe-actions'
import { getRequestStatus } from '../../requestStatus'
import { TaxonomyAppStore as StoreTaxonomy, TaxonomyResponse } from './Taxonomy.interface'

const requestTaxonomy = createAsyncAction(
  'taxonomy:pending',
  'taxonomy:fulfilled',
  'taxonomy:rejected',
)<undefined, TaxonomyResponse, undefined>()

const initialState: StoreTaxonomy = {
  requestStatus: getRequestStatus().idle,
  pencilCount: 0,
  countries: [],
  tags: [],
}

export const taxonomyActions = { requestTaxonomy }
export type TaxonomyActions = ActionType<typeof taxonomyActions>

export default createReducer<StoreTaxonomy, TaxonomyActions>(initialState)
  .handleAction(requestTaxonomy.request, state => ({
    requestStatus: getRequestStatus().pending,
    pencilCount: state.pencilCount,
    countries: state.countries,
    tags: state.tags,
  }))
  .handleAction(requestTaxonomy.success, (state, { payload }) => ({
    requestStatus: getRequestStatus().fulfilled,
    pencilCount: payload.meta.pencils,
    countries: payload.taxonomy.countries,
    tags: payload.taxonomy.tags,
  }))
  .handleAction(requestTaxonomy.failure, state => ({
    requestStatus: getRequestStatus().rejected,
    pencilCount: state.pencilCount,
    countries: state.countries,
    tags: state.tags,
  }))
