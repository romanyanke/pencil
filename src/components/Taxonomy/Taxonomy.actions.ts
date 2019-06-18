import { ActionType, createAsyncAction, createReducer } from 'typesafe-actions'
import { getRequestStatus } from '../../modules/requestStatus'
import { TaxonomyAppStore as StoreTaxonomy, TaxonomyResponse } from './Taxonomy.interface'

export const requestTaxonomy = createAsyncAction(
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

const actions = { requestTaxonomy }
type Actions = ActionType<typeof actions>

export default createReducer<StoreTaxonomy, Actions>(initialState)
  .handleAction(requestTaxonomy.request, state => ({
    ...state,
    requestStatus: getRequestStatus().pending,
  }))
  .handleAction(requestTaxonomy.success, (state, { payload }) => ({
    ...state,
    countries: payload.taxonomy.countries,
    requestStatus: getRequestStatus().fulfilled,
    tags: payload.taxonomy.tags,
    pencilCount: payload.meta.pencils,
  }))
  .handleAction(requestTaxonomy.failure, state => ({
    ...state,
    requestStatus: getRequestStatus().rejected,
  }))
