export type PencilProps = PencilPropsSingle | PencilPropsList

interface PencilPropsBase {
  id?: string
  query?: PencilQuery
  queries?: PencilQuery[]
}

interface PencilPropsSingle extends PencilPropsBase {
  id: string
}

interface PencilPropsList extends PencilPropsBase {
  query?: PencilQuery
  queries?: PencilQuery[]
}

export interface PencilRequest {
  id?: string
  query?: PencilQuery
}

export type PencilQuery = Partial<PencilQueryBody>
interface PencilQueryBody {
  page: number
  tag: string
  country: string
}

export interface PencilSingleRequest extends PencilRequest {
  id: string
}
export interface PencilsListRequest extends PencilRequest {
  query: PencilQuery
}

export type PencilSingleResponse = Pencil
export interface PencilListResponse {
  cacheId: string
  geo: string[]
  pages: PencilPages
  data: Pencil[]
}

export interface PencilAppStore {
  cache: Partial<PencilCache>
  data: PencilsNormalized
}

export type PencilCache = Record<string, PencilCacheItem>
export type PencilsNormalized = Partial<Record<string, Pencil>>

export interface PencilCacheItem {
  ids: string[]
  geo: string[]
  pages: PencilPages
}

export interface Pencil {
  city: string | null
  country: PencilCountry | null
  map: PencilMap | null
  content: string
  count: number
  grid: PencilGridSize
  id: string
  geo: string
  photos: string[]
  preview: string
  tags: string[]
  title: string
}

export type PencilGridSize = 1 | 2 | 3

export interface PencilCountry {
  name: string
  flag: string
  geo: string
  pencils: number
}

interface PencilMap {
  lat: number
  lng: number
}

export interface PencilPages {
  currentPage: number
  totalPages: number
  records: number
  pencils: number
}
