import { TaxonomyResponse } from './Taxonomy.interface'
import apiRequest from '../../api'

export const apiRequestTaxonomy = () => apiRequest<TaxonomyResponse>('/taxonomy/')
