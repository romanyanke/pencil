import { isUndefined } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { requestPencilList, requestSinglePencil } from './Pencil.actions'
import { useNormalizedPencils, usePecnilRequestStatus, usePencilCache } from './Pencil.hooks'
import { Pencil as PencilInterface, PencilProps, PencilQuery } from './Pencil.interface'
import { getPencilsFromCacheByQuery, mapRequestToCacheId } from './Pencil.utils'

// tslint:disable: no-shadowed-variable
const Pencil = ({ id, query, queries, children }: PencilProps) => {
  const dispatch = useDispatch()
  const requestStatus = usePecnilRequestStatus()
  const cache = usePencilCache()
  const normalized = useNormalizedPencils()
  const pencil = id ? normalized[id] : undefined
  const targetQueries = query ? [query] : queries ? queries : []
  const pencils = targetQueries.reduce<PencilInterface[]>(
    (acc, query) => [...acc, ...getPencilsFromCacheByQuery(query, cache, normalized)],
    [],
  )

  useEffect(() => {
    const isNotCached = (query: PencilQuery) => isUndefined(cache[mapRequestToCacheId({ query })])
    if (id && !pencil) {
      dispatch(requestSinglePencil.request({ id }))
    } else if (query && isNotCached(query)) {
      dispatch(requestPencilList.request({ query }))
    } else if (queries) {
      queries.filter(isNotCached).forEach(query => {
        dispatch(requestPencilList.request({ query }))
      })
    }
  }, [dispatch, id, query, queries, pencil, cache])

  return <>{children({ requestStatus, pencil, pencils })} </>
}

export default Pencil
