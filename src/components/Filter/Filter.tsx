import { FormattedMessage, useIntl } from 'react-intl'
import { useFilter, useFilerQueryString } from './Filter.hooks'
import messages from './Filter.messages'
import Globe from './Globe'
import { useTaxonomy, useCountries } from '../Taxonomy/Taxonomy.hooks'
import { appMessages } from '../App/App.messages'
import TagHeader from '../PencilInfo/TagHeader'

const Filter = () => {
  const intl = useIntl()
  const [filter, { updateFilter, setFilter, isFiltered }] = useFilter()
  const { statistic } = useTaxonomy()
  const countries = useCountries()

  useFilerQueryString()

  const htmlFor = 'country-filter'

  return (
    <div className="Filter">
      <div className="Filter-control">
        <label
          htmlFor={htmlFor}
          className="Filter-label"
          onClick={() => isFiltered && updateFilter({ country: '' })}
        >
          <span className="Filter-Globe">
            <Globe animated={isFiltered} />
          </span>
          <FormattedMessage
            {...messages.title}
            values={{
              pencils: (
                <span className="Filter-span">
                  <FormattedMessage {...appMessages.pencil} values={{ count: statistic.pencils }} />
                </span>
              ),
              countries: (
                <span className="Filter-span">
                  <FormattedMessage
                    {...appMessages.country}
                    values={{ count: statistic.countries }}
                  />
                </span>
              ),
            }}
          />
        </label>
      </div>
      <div className="Filter-control">
        <select
          id={htmlFor}
          className="Filter-select"
          value={filter.country}
          onChange={e => setFilter({ country: e.target.value })}
        >
          <option key="empty-country" value="">
            {intl.formatMessage(messages.all)}
          </option>

          {countries.map(country => (
            <option key={country.name} value={country.geo}>
              {intl.formatMessage(messages.option, {
                flag: country.flag,
                country: country.name,
                count: country.pencils,
              })}
            </option>
          ))}
        </select>
      </div>

      {filter.tag ? (
        <div className="Filter-control">
          <TagHeader />
        </div>
      ) : null}
    </div>
  )
}

export default Filter
