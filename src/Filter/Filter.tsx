import { useTranslation } from 'react-i18next'
import classes from './Filter.module.css'
import { Country } from './Country/Country'
import { useStatistic } from '../Taxonomy/Taxonomy.hooks'

export const Filter = () => {
  const { t } = useTranslation()
  const stat = useStatistic()

  return (
    <h1 className={classes.root}>
      <span>{t('pencils', { count: stat.pencils })}</span>
      <Country />
      <span>{t('countries', { count: stat.countries })}</span>
    </h1>
  )
}
