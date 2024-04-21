import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import classes from './Title.module.css'
import { useSubtitle } from './Title.hooks'
import { useAppState } from '../State/State.hooks'

export const Title = () => {
  const { t } = useTranslation()
  const { isFilterApplied, resetFilter } = useAppState()

  const subtitle = useSubtitle()

  useEffect(() => {
    document.title = `${t('title')}: ${subtitle}`
  }, [subtitle, t])

  return (
    <h2 className={classes.root}>
      {subtitle}
      {isFilterApplied && (
        <a
          className={classes.clear}
          href="/"
          onClick={e => {
            e.preventDefault()
            resetFilter()
          }}
        >
          {t('drop-filter')}
        </a>
      )}
    </h2>
  )
}
