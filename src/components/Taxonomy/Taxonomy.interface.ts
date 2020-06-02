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
  loading: boolean
  failure: boolean
  pencilCount: number
  countries: PencilCountry[]
  tags: string[]
}
