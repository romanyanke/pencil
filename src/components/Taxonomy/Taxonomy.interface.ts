import { RequestStatus } from '../../modules/requestStatus'
import { PencilCountry } from '../Pencil/Pencil.interface'

export interface TaxonomyResponse {
  meta: {
    tags: number
    countries: number
    items: number
    pencils: number
  }
  taxonomy: {
    tags: string[]
    countries: PencilCountry[]
  }
}

export interface TaxonomyAppStore {
  requestStatus: RequestStatus
  pencilCount: number
  countries: PencilCountry[]
  tags: string[]
}
