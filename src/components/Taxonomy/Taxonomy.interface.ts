import { PencilCountry } from '../Pencil/Pencil.interface'

export interface TaxonomyResponse {
  statistic: TaxonomyStatistic
  tags: string[]
  countries: PencilCountry[]
}

export interface TaxonomyAppStore extends TaxonomyResponse {
  pending: boolean
  failure: boolean
  pencilCount: number
}

interface TaxonomyStatistic {
  tags: number
  countries: number
  items: number
  pencils: number
}
