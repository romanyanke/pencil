import { Location } from 'history'
import React, { useEffect, useRef } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { useFilter } from './Filter.hooks'
import messages from './Filter.messages'
import { mapFilterToQueryString, mapQueryStringToFilter } from './Filter.utils'
import Globe from './Globe'
import { useTaxonomy } from '../Taxonomy/Taxonomy.hooks'
import { useCached } from '../Pencil/Pencil.hooks'
import { appMessages } from '../App/App.messages'

const Filter = () => {
  const [filter, setFilter] = useFilter()
  const { countries, pencilCount } = useTaxonomy()
  const cached = useCached()
  const history = useHistory()
  const intl = useIntl()
  const select = useRef<HTMLSelectElement>(null)

  const isFiltered = Boolean(filter.country || filter.tag)
  const pencilsInCountry = cached?.pages.pencils

  useEffect(() => {
    if (mapFilterToQueryString(filter) !== window.location.search) {
      history.push(mapFilterToQueryString(filter))
    }
  }, [filter, history])

  useEffect(() => {
    const unlisten = history.listen(({ search }: Location, action) => {
      if (action === 'POP') {
        setFilter(mapQueryStringToFilter(search))
      }
    })

    return unlisten
  }, [filter, history, setFilter])

  return (
    <div className="Filter">
      <div className="Filter-control">
        <button
          className="Filter-clear-button"
          onClick={() => {
            select.current?.focus()
            if (isFiltered) {
              setFilter({ country: '' })
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
                  <FormattedMessage
                    {...appMessages.country}
                    values={{ count: countries.length + 1 }}
                  />
                </span>
              ),
            }}
          />
        </button>
      </div>
      <div className="Filter-control">
        <select
          ref={select}
          className="Filter-select"
          value={filter.country}
          onChange={e => setFilter({ country: e.target.value, tag: '' })}
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
    </div>
  )
}

export default Filter
