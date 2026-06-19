import { useTranslation } from 'react-i18next'
import { useAppState } from '../../State/State.hooks'
import { useCountries } from '../../Taxonomy/Taxonomy.hooks'
import classes from './Country.module.css'

export const Country = () => {
  const { t } = useTranslation()
  const countries = useCountries()
  const { state, closeCountry, openCountry } = useAppState()
  const emptyValue = ''
  const value = state.country || emptyValue

  return (
    <select
      autoFocus
      className={classes.select}
      value={value}
      onChange={e => {
        const newValue = e.target.value

        if (newValue === emptyValue) {
          closeCountry()
        } else {
          openCountry(newValue)
        }
      }}
    >
      <button type="button">
        <selectedcontent></selectedcontent>
      </button>

      <option value={emptyValue}>
        <span aria-hidden="true">🌍</span>
        {t('all-countries')}
      </option>

      {countries.map(country => (
        <option key={country.geo} value={country.geo}>
          <span aria-hidden="true">{country.flag}</span>
          {country.name}
        </option>
      ))}
    </select>
  )
}
