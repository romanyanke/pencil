import {
  Pencil,
  PencilCache,
  PencilCacheItem,
  PencilListResponse,
  PencilPages,
  PencilQuery,
  PencilRequest,
  PencilSingleRequest,
  PencilsNormalized,
} from './Pencil.interface'

const getEmptyPencilCacheItem = (): PencilCacheItem => ({
  ids: [],
  geoIds: [],
  pages: {
    page: 0,
    total: 0,
    nextUrl: null,
    items: 0,
    pencils: 0,
  },
})

export const mapPencilsingleQueryRequestUrl = ({ id }: PencilSingleRequest): string =>
  `/pencil/${id}/`

export const mapPencilListQueryRequestUrl = ({ page, tag, country }: PencilQuery): string => {
  const pathParts: string[] = []
  const sanitize = (input: string) => encodeURIComponent(input.toLowerCase().replace(/\s/g, '-'))

  if (tag && country) {
    throw new Error('no tag and country at the same time')
  }

  if (tag) {
    pathParts.push(`/tags/${sanitize(tag)}`)
  }
  if (country) {
    pathParts.push(`/countries/${sanitize(country)}`)
  }
  if (page && page !== 1) {
    pathParts.push(`/page/${page}`)
  }

  return `${pathParts.join('/')}/`
}

export const mapRequestToCacheId = (request: PencilRequest): string => {
  const cahceIdParts: string[] = ['_']
  if (request.id) {
    return `id:${request.id}`
  } else if (request.query) {
    const { page, tag, country } = request.query
    if (page) {
      cahceIdParts.push(`p:${page}`)
    }
    if (tag) {
      cahceIdParts.push(`t:${tag}`)
    }
    if (country) {
      cahceIdParts.push(`c:${country}`)
    }
  }

  return cahceIdParts.join('|')
}

interface CacheAndNormalize {
  cache: PencilCache
  normalized: PencilsNormalized
}
export const getCacheAndNormilizedFromList = ({
  cacheId,
  pages,
  data,
  geoIds,
}: PencilListResponse): CacheAndNormalize => {
  const ids = data.map(({ id }) => id)
  const normalized = data.reduce((list, pencil) => ({ ...list, [pencil.id]: pencil }), {})

  return { normalized, cache: { [cacheId]: { ids, pages, geoIds } } }
}

export const getNextPageNumberFromPages = (pages?: PencilPages): number | null => {
  if (pages) {
    if (pages.page < pages.total) {
      return pages.page + 1
    }
  }

  return null
}

export const getPencilsFromCacheByQuery = (
  query: PencilQuery,
  cache: Partial<PencilCache>,
  normalized: PencilsNormalized,
): Pencil[] => {
  const pencilCache: PencilCacheItem =
    cache[mapRequestToCacheId({ query })] || getEmptyPencilCacheItem()
  const pencils = pencilCache.ids.map(id => {
    const data = normalized[id]
    if (!data) {
      throw new Error(`no cache for id ${id}`)
    }

    return data
  })

  return pencils
}
