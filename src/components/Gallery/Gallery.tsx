import { last, throttle } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useFilter } from '../Filter/Filter.hooks'
import { useCached, usePencil } from '../Pencil/Pencil.hooks'
import { PencilQuery } from '../Pencil/Pencil.interface'
import { getNextPageNumberFromPages } from '../Pencil/Pencil.utils'
import { requestFirstPage } from './Gallery.utils'
import Grid from './Grid'

const Gallery = () => {
  const [filter] = useFilter()
  const [queries, setQueries] = useState<PencilQuery[]>([])
  const cached = useCached(last(queries))
  const { pencils } = usePencil({ queries })
  const { country, tag } = filter

  useEffect(() => {
    setQueries([requestFirstPage({ country, tag })])
  }, [country, tag])

  useEffect(() => {
    const nextPageNumber = getNextPageNumberFromPages(cached?.pages)
    const onScroll = throttle(() => {
      if (nextPageNumber) {
        const preloadSensivity = document.body.clientHeight * 0.6
        const scrollBottomLine = window.pageYOffset + window.innerHeight
        if (preloadSensivity < scrollBottomLine) {
          setQueries([...queries, { ...filter, page: nextPageNumber }])
        }
      }
    }, 300)
    if (nextPageNumber) {
      window.addEventListener('scroll', onScroll)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [queries, cached, filter])

  return <Grid pencils={pencils} />
}

export default Gallery
