import { useTranslation } from 'react-i18next'
import { useAppState } from '../../State/State.hooks'
import { useCountries } from '../../Taxonomy/Taxonomy.hooks'

export const Country = () => {
  const { t } = useTranslation()
  const countries = useCountries()
  const { state, closeCountry, openCountry } = useAppState()
  const emptyValue = ''
  const value = state.country || emptyValue

  return (
    <select
      autoFocus
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
      <option value={emptyValue}>{`🌍 ${t('all-countries')}`}</option>

      {countries.map(country => (
        <option key={country.geo} value={country.geo}>
          {country.flag} {country.name}
        </option>
      ))}
    </select>
  )
}
