import { throttle } from 'lodash'
import React, { FC, useEffect, useState } from 'react'
import { useFilter } from '../Filter/Filter.hooks'
import Pencil from '../Pencil'
import { useCached } from '../Pencil/Pancil.hooks'
import { PencilQuery } from '../Pencil/Pencil.interface'
import { getNextPageNumberFromPages } from '../Pencil/Pencil.utils'
import { requestFirstPage } from './Gallery.utils'
import Grid from './Grid'

const Gallery: FC = () => {
  const [filter] = useFilter()
  const [queries, setQueries] = useState<PencilQuery[]>([requestFirstPage(filter)])
  const [loading, setLoading] = useState(false)
  const lastQuery = queries[queries.length - 1]
  const cached = useCached(lastQuery)
  const nextPageNumber = cached ? getNextPageNumberFromPages(cached.pages) : null

  useEffect(() => {
    setQueries([requestFirstPage(filter)])
  }, [filter])
  useEffect(() => setLoading(false), [nextPageNumber])
  useEffect(() => {
    const loadNextPage = (page: number) => {
      setQueries([...queries, { page, ...filter }])
    }
    const onScroll = throttle(() => {
      if (nextPageNumber && !loading) {
        const scrollBottomLine = window.pageYOffset + window.innerHeight
        const total = document.body.clientHeight
        if (total * 0.6 < scrollBottomLine) {
          setLoading(true)
          loadNextPage(nextPageNumber)
        }
      }
    }, 500)
    if (nextPageNumber) {
      window.addEventListener('scroll', onScroll)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [queries, nextPageNumber, loading, filter])

  return <Pencil queries={queries}>{({ pencils }) => <Grid pencils={pencils} />}</Pencil>
}

export default Gallery
