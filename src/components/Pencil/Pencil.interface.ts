import { ReactNode } from 'react'
import { RequestStatus } from './../../modules/requestStatus'
export type PencilProps = PencilOwnPropsSingle | PencilOwnPropsList

export interface PencilOwnProps {
  id?: string
  query?: PencilQuery
  queries?: PencilQuery[]
  children(injectedProps: PencilInjectedProps): ReactNode
}

export interface PencilOwnPropsSingle extends PencilOwnProps {
  id: string
}

export interface PencilOwnPropsList extends PencilOwnProps {
  query?: PencilQuery
  queries?: PencilQuery[]
}

export type PencilQuery = Partial<PencilQueryFields>
export interface PencilQueryFields {
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

export interface PencilCacheNormalizeInput {
  pencils: Pencil[]
  cacheId: string
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

export interface PencilInjectedProps {
  requestStatus: RequestStatus
  pencils: Pencil[]
  pencil?: Pencil
}

export interface Pencil {
  city: string
  content: string
  count: number
  grid: 1 | 2 | 3
  country: PencilCountry
  geo: string
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

export interface PencilMap {
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
