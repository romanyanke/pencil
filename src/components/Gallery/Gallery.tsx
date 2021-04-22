import last from 'lodash/last'
import throttle from 'lodash/throttle'
import { useCallback, useEffect, useMemo, useState } from 'react'
import isNumber from 'lodash/isNumber'
import { checkWindowScroll, requestFirstPage } from './Gallery.utils'
import Grid from './Grid'
import { useFilter } from '../Filter/Filter.hooks'
import { usePencilCache, usePencil } from '../Pencil/Pencil.hooks'
import { PencilQuery } from '../Pencil/Pencil.interface'
import { getNextPageNumberFromPages } from '../Pencil/Pencil.utils'
import Loader from '../Loader'

const Gallery = () => {
  const [filter] = useFilter()
  const [queries, setQueries] = useState<PencilQuery[]>([])
  const { pencils } = usePencil({ queries })
  const cached = usePencilCache(last(queries))
  const { country, tag } = filter
  const page = getNextPageNumberFromPages(cached?.pages)
  const hasNextPage = isNumber(page)

  useEffect(() => {
    setQueries([requestFirstPage({ country, tag })])
    document.documentElement.scrollTop = 0
  }, [country, tag])

  const loadNextPage = useCallback(() => {
    if (page) {
      setQueries([...queries, { ...filter, page }])
    }
  }, [filter, queries, setQueries, page])

  const onScroll = useMemo(
    () =>
      throttle(
        () => {
          if (page && checkWindowScroll()) {
            loadNextPage()
          }
        },
        100,
        { leading: false, trailing: false },
      ),
    [loadNextPage, page],
  )

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  return (
    <>
      <Grid pencils={pencils} />
      {hasNextPage && (
        <div className="Gallery-loader">
          <Loader />
        </div>
      )}
    </>
  )
}

export default Gallery
