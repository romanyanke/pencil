import { RequestStatus } from '../../requestStatus'
export type PencilProps = PencilOwnPropsSingle | PencilOwnPropsList

interface PencilOwnProps {
  id?: string
  query?: PencilQuery
  queries?: PencilQuery[]
}

interface PencilOwnPropsSingle extends PencilOwnProps {
  id: string
}

interface PencilOwnPropsList extends PencilOwnProps {
  query?: PencilQuery
  queries?: PencilQuery[]
}

export type PencilQuery = Partial<PencilQueryFields>
interface PencilQueryFields {
  page: number
  tag: string
  country: string
}

export interface PencilRequest {
  id?: string
  query?: PencilQuery
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
  pages: PencilPages
  data: Pencil[]
}

export interface PencilAppStore {
  requestStatus: RequestStatus
  cache: Partial<PencilCache>
  normalized: PencilsNormalized
}

export type PencilCache = Record<string, PencilCacheItem>
export type PencilsNormalized = Partial<Record<string, Pencil>>

export interface PencilCacheItem {
  ids: string[]
  pages: PencilPages
}

export interface Pencil {
  city: string
  content: string
  count: number
  grid: 1 | 2 | 3
  country: Pick<PencilCountry, 'id' | 'name'>
  id: string
  map: PencilMap | null
  photos: string[]
  preview: string
  tags: string[]
  title: string
}

export interface PencilCountry {
  name: string
  id: string
  flag: string
}

interface PencilMap {
  lat: number
  lng: number
}

export interface PencilPages {
  page: number
  total: number
  nextUrl: string | null
  items: number
  pencils: number
}
