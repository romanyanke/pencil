import { useTranslation } from 'react-i18next'
import classes from './LoadMoreButton.module.css'
import Globe from '../../Globe'
import { useFeed } from '../Feed.hooks'

const LoadMoreButton = () => {
  const { t } = useTranslation()
  const { hasNextPage, loadNextPage, query } = useFeed()
  const { isFetching } = query

  return hasNextPage ? (
    <button onClick={loadNextPage} className={classes.root} disabled={isFetching}>
      <Globe animated={isFetching} /> {t(isFetching ? 'loading' : 'load-more')}
    </button>
  ) : null
}

export default LoadMoreButton
