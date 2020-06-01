import last from 'lodash/last'
import throttle from 'lodash/throttle'
import React, { useCallback, useEffect, useState } from 'react'
import { checkWindowScroll, requestFirstPage } from './Gallery.utils'
import Grid from './Grid'
import { useFilter } from '../Filter/Filter.hooks'
import { useCached, usePencil } from '../Pencil/Pencil.hooks'
import { PencilQuery } from '../Pencil/Pencil.interface'
import { getNextPageNumberFromPages } from '../Pencil/Pencil.utils'

const Gallery = () => {
  const [filter] = useFilter()
  const [queries, setQueries] = useState<PencilQuery[]>([])
  const { pencils } = usePencil({ queries })
  const cached = useCached(last(queries))
  const { country, tag } = filter
  const page = getNextPageNumberFromPages(cached?.pages)

  useEffect(() => {
    setQueries([requestFirstPage({ country, tag })])
    document.documentElement.scrollTop = 0
  }, [country, tag])

  const loadNextPage = useCallback(() => {
    if (page) {
      setQueries([...queries, { ...filter, page }])
    }
  }, [filter, queries, setQueries, page])

  const onScroll = useCallback(
    throttle(
      () => {
        if (page && checkWindowScroll()) {
          loadNextPage()
        }
      },
      100,
      { leading: false, trailing: false },
    ),
    [loadNextPage],
  )

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  return <Grid pencils={pencils} />
}

export default Gallery
