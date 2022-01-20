import { useAppState } from '../../State/State.hooks'
import { useCountries } from '../../Taxonomy/Taxonomy.hooks'

const Country = () => {
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
      <option value={emptyValue}>🌍 Все страны</option>

      {countries.map(country => (
        <option key={country.geo} value={country.geo}>
          {country.flag} {country.name}
        </option>
      ))}
    </select>
  )
}

export default Country
