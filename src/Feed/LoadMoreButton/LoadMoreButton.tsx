import { useTranslation } from 'react-i18next'
import classes from './LoadMoreButton.module.css'
import { useFeed } from '../Feed.hooks'
import { Globe } from '../../Globe/Globe'

export const LoadMoreButton = () => {
  const { t } = useTranslation()
  const { hasNextPage, loadNextPage, query } = useFeed()
  const { isFetching } = query

  return hasNextPage ? (
    <button onClick={loadNextPage} className={classes.root} disabled={isFetching}>
      <Globe animated={isFetching} /> {t(isFetching ? 'loading' : 'load-more')}
    </button>
  ) : null
}
