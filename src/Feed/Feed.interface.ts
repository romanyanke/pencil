import { TaxonomyCountry } from '../Taxonomy/Taxonomy.interface'

export interface FeedFilter {
  country?: string
  tag?: string
}

export interface FeedApiPayload extends FeedFilter {
  locale: string
  page?: number
}

export interface FeedApiResponse {
  data: FeedPencil[]
  pages: FeedPages
  geo?: string[]
}

export interface FeedPencil {
  grid: PencilGridSize
  id: string
  photos: string[]
  title: string
}

export interface PencilData extends FeedPencil {
  city: string
  content: string
  count: number
  country: TaxonomyCountry
  tags: string[]
  map: {
    lat: number
    lng: number
  }
}

export type PencilGridSize = 1 | 2 | 3

export interface FeedPages {
  currentPage: number
  totalPages: number
}
