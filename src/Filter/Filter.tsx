import Country from './Country'
import classes from './Filter.module.css'
import { formatPlural } from '../App/App.utils'
import { useStatistic } from '../Taxonomy/Taxonomy.hooks'

const Filter = () => {
  const stat = useStatistic()

  return (
    <h1 className={classes.root}>
      <span>{formatPlural.pencil(stat.pencils)}</span>
      <Country />
      <span>{formatPlural.country(stat.countries)}</span>
    </h1>
  )
}

export default Filter
