import { Location } from 'history'
import React, { ChangeEvent, SFC, useEffect, useRef } from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { appMessages } from '../App/App.messages'
import { useCached } from '../Pencil/Pancil.hooks'
import { useTaxonomy } from '../Taxonomy/Taxonomy.hooks'
import { useFilter } from './Filter.hooks'
import { FilterProps } from './Filter.interface'
import messages from './Filter.messages'
import { mapFilterToQueryString, mapQueryStringToFilter } from './Filter.utils'
import Globe from './Globe'

const Filter: SFC<FilterProps & RouteComponentProps & InjectedIntlProps> = ({ history, intl }) => {
  const { countries, pencilCount } = useTaxonomy()
  const [filter, setFilter] = useFilter()
  const cached = useCached()

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

  const isCountryFiltered = Boolean(filter.country)
  const select = useRef<HTMLSelectElement>(null)

  return (
    <div className="Filter">
      <div className="Filter-control">
        <button
          className="Filter-clear-button"
          onClick={() => {
            if (isCountryFiltered) {
              setFilter({ country: '' })
            }
            if (select.current) {
              select.current.focus()
            }
          }}
        >
          <span className="Filter-Globe">
            <Globe animated={isCountryFiltered} />
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
        </button>
      </div>
      <div className="Filter-control">
        <select
          ref={select}
          className="Filter-select"
          value={filter.country}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFilter({ country: e.target.value, tag: '' })
          }
        >
          <option key="empty-country" value="">
            Все страны
          </option>
          {countries.map(country => {
            const isCurrent = filter.country === country.name
            return (
              <option key={country.name} value={country.name}>
                {country.flag}{' '}
                {isCurrent && cached
                  ? intl.formatMessage(messages.current, {
                      country: country.name,
                      pencils: intl.formatMessage(appMessages.pencil, {
                        count: cached.pages.pencils,
                      }),
                    })
                  : country.name}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default injectIntl(withRouter(Filter))
