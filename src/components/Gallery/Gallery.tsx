import { throttle } from 'lodash'
import React, { FC, useEffect, useState } from 'react'
import { useFilter } from '../Filter/Filter.hooks'
import Loader from '../Loader'
import Pencil from '../Pencil'
import { useCached } from '../Pencil/Pancil.hooks'
import { PencilQuery } from '../Pencil/Pencil.interface'
import { getNextPageNumberFromPages } from '../Pencil/Pencil.utils'
import { requestFirstPage } from './Gallery.utils'
import Grid from './Grid'

const Gallery: FC = () => {
  const [filter] = useFilter()
  const [queries, setQueries] = useState<PencilQuery[]>([])
  const lastQuery = queries[queries.length - 1]
  const cached = useCached(lastQuery)
  const nextPageNumber = cached ? getNextPageNumberFromPages(cached.pages) : null
  const { country, tag, page } = filter

  useEffect(() => {
    setQueries([requestFirstPage({ country, tag, page })])
  }, [country, tag, page])
  useEffect(() => {
    const loadNextPage = (nextpage: number) => {
      setQueries([...queries, { page: nextpage, ...filter }])
    }
    const onScroll = throttle(() => {
      if (nextPageNumber) {
        const scrollBottomLine = window.pageYOffset + window.innerHeight
        const total = document.body.clientHeight
        if (total * 0.6 < scrollBottomLine) {
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
  }, [queries, nextPageNumber, filter])

  return (
    <Pencil queries={queries}>
      {({ pencils }) => (
        <>
          <Grid pencils={pencils} />

          {nextPageNumber ? (
            <div className="Gallery-loading">
              <Loader />
            </div>
          ) : null}
        </>
      )}
    </Pencil>
  )
}

export default Gallery
