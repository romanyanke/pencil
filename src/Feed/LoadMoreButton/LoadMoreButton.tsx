import classes from './LoadMoreButton.module.css'
import Globe from '../../Globe'
import { useFeed } from '../Feed.hooks'

const LoadMoreButton = () => {
  const { hasNextPage, loadNextPage, query } = useFeed()
  const { isFetching } = query

  return hasNextPage ? (
    <button onClick={loadNextPage} className={classes.root} disabled={isFetching}>
      <Globe animated={isFetching} /> {isFetching ? 'Загрузка…' : 'Загрузить еще'}
    </button>
  ) : null
}

export default LoadMoreButton
