import mapKeys from 'lodash/mapKeys'
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
  PencilAppStore,
} from './Pencil.interface'

const getEmptyPencilCacheItem = (): PencilCacheItem => ({
  ids: [],
  geo: [],
  pages: {
    currentPage: 0,
    totalPages: 0,
    records: 0,
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
    pathParts.push(`tags/${sanitize(tag)}`)
  }
  if (country) {
    pathParts.push(`geo/${country}`)
  }
  if (page && page !== 1) {
    pathParts.push(`page/${page}`)
  }

  return `/${pathParts.join('/')}`
}

export const mapRequestToCacheId = (request: PencilRequest): string => {
  const cahceIdParts = ['']
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

  return cahceIdParts.join('/')
}

export const mapPancilsResponseToStore = ({
  cacheId,
  pages,
  data: pencils,
  geo,
}: PencilListResponse): PencilAppStore => {
  const ids = pencils.map(({ id }) => id)
  const data = mapKeys(pencils, item => item.id)

  return { data, cache: { [cacheId]: { ids, pages, geo } } }
}

export const getNextPageNumberFromPages = (pages?: PencilPages) => {
  if (pages) {
    if (pages.currentPage < pages.totalPages) {
      return pages.currentPage + 1
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
