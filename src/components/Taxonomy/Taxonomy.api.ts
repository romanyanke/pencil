import apiRequest from '../../modules/api'
import { TaxonomyResponse } from './Taxonomy.interface'

export const apiRequestTaxonomy = () => apiRequest<TaxonomyResponse>('/taxonomy/')
