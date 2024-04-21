import { useEffect } from 'react'
import throttle from 'lodash/throttle'
import { checkWindowScroll } from './InfiniteScroll.utils'
import { useFeed } from '../Feed.hooks'

export const InfiniteScroll = () => {
  const { loadNextPage, hasNextPage } = useFeed()

  useEffect(() => {
    const onScroll = throttle(
      () => {
        if (hasNextPage && checkWindowScroll()) {
          loadNextPage()
        }
      },
      100,
      { leading: false, trailing: false },
    )

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [hasNextPage, loadNextPage])

  return null
}
