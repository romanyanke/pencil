import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useFilter } from './Filter.hooks'
import messages from './Filter.messages'
import Globe from './Globe'
import { useTaxonomy } from '../Taxonomy/Taxonomy.hooks'
import { usePencilCache } from '../Pencil/Pencil.hooks'
import { appMessages } from '../App/App.messages'
import TagHeader from '../PencilInfo/TagHeader'

const Filter = () => {
  const [filter, { updateFilter, setFilter }] = useFilter()
  const { countries, pencilCount } = useTaxonomy()
  const cached = usePencilCache()
  const intl = useIntl()

  const isFiltered = Boolean(filter.country || filter.tag)
  const pencilsInCountry = cached?.pages.pencils
  const htmlFor = 'country-filter'

  return (
    <div className="Filter">
      <div className="Filter-control">
        <label
          htmlFor={htmlFor}
          className="Filter-label"
          onClick={() => {
            if (isFiltered) {
              updateFilter({ country: '' })
            }
          }}
        >
          <span className="Filter-Globe">
            <Globe animated={isFiltered} />
          </span>
          <FormattedMessage
            {...messages.title}
            values={{
              pencils: (
                <span className="Filter-span">
                  <FormattedMessage {...appMessages.pencil} values={{ count: pencilCount }} />
                </span>
              ),
              countries: (
                <span className="Filter-span">
                  <FormattedMessage {...appMessages.country} values={{ count: countries.length }} />
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
          {countries.map(country => {
            const isCurrent = filter.country === country.name
            const optionText =
              isCurrent && pencilsInCountry
                ? intl.formatMessage(messages.current, {
                    country: country.name,
                    pencils: intl.formatMessage(appMessages.pencil, {
                      count: pencilsInCountry,
                    }),
                  })
                : country.name

            return (
              <option key={country.name} value={country.name}>
                {`${country.flag} ${optionText}`}
              </option>
            )
          })}
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
