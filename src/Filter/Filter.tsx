import { useTranslation } from 'react-i18next'
import Country from './Country'
import classes from './Filter.module.css'
import { useStatistic } from '../Taxonomy/Taxonomy.hooks'

const Filter = () => {
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

export default Filter
