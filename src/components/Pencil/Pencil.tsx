import React, { SFC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNormalizedPencils, usePecnilRequestStatus, usePencilCache } from './Pancil.hooks'
import { requestPencilList, requestSinglePencil } from './Pencil.actions'
import { Pencil as PencilInterface, PencilProps } from './Pencil.interface'
import { getPencilsFromCacheByQuery } from './Pencil.utils'

// tslint:disable: no-shadowed-variable
const Pencil: SFC<PencilProps> = ({ id, query, queries, children }) => {
  const dispatch = useDispatch()
  const requestStatus = usePecnilRequestStatus()
  const cache = usePencilCache()
  const normalized = useNormalizedPencils()
  const pencil = id ? normalized[id] : undefined
  const targetQueries = query ? [query] : queries ? queries : []
  const pencils = targetQueries.reduce<PencilInterface[]>((acc, query) => {
    return [...acc, ...getPencilsFromCacheByQuery(query, cache, normalized)]
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(requestSinglePencil.request({ id }))
    } else if (query) {
      dispatch(requestPencilList.request({ query }))
    } else if (queries) {
      queries.forEach(query => {
        dispatch(requestPencilList.request({ query }))
      })
    }
  }, [dispatch, id, query, queries])

  return <>{children({ requestStatus, pencil, pencils })} </>
}

export default Pencil
