import { last, throttle } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useFilter } from '../Filter/Filter.hooks'
import { useCached, usePencil } from '../Pencil/Pencil.hooks'
import { PencilQuery } from '../Pencil/Pencil.interface'
import { getNextPageNumberFromPages } from '../Pencil/Pencil.utils'
import { checkWindowScroll, requestFirstPage } from './Gallery.utils'
import Grid from './Grid'

const Gallery = () => {
  const [filter] = useFilter()
  const [queries, setQueries] = useState<PencilQuery[]>([])
  const { pencils } = usePencil({ queries })
  const cached = useCached(last(queries))
  const { country, tag } = filter

  const loadNextPage = useCallback(() => {
    const page = getNextPageNumberFromPages(cached?.pages)
    if (page) {
      setQueries([...queries, { ...filter, page }])
    }
  }, [filter, queries, setQueries, cached])

  useEffect(() => {
    setQueries([requestFirstPage({ country, tag })])
  }, [country, tag])

  useEffect(() => {
    const onScroll = throttle(() => {
      if (filter.display === '' && checkWindowScroll()) {
        loadNextPage()
      }
    }, 500)

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [queries, cached, filter, loadNextPage])

  return <Grid pencils={pencils} />
}

export default Gallery
