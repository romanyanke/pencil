import classNames from 'classnames'
import isUndefined from 'lodash/isUndefined'
import mapKeys from 'lodash/mapKeys'
import { mapHeight, mapWidth, topologies } from './Map.utils'
import { useFilter, useFilterCountries } from '../Filter/Filter.hooks'
import { useCountryRecord } from '../Taxonomy/Taxonomy.hooks'

const Map = () => {
  const [, { setFilter, updateFilter }] = useFilter()
  const countryRecord = useCountryRecord()
  const filterCountries = useFilterCountries()

  const activeCountries = mapKeys(filterCountries, ({ geo }) => geo)

  return (
    <div className="Map">
      <div className="Map-flags">
        {filterCountries.map(({ flag }) => (
          <span key={flag}>{flag}</span>
        ))}
      </div>
      <svg
        width={mapWidth}
        height={mapHeight}
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        className="Map-block"
      >
        {topologies.map(topology => {
          const geoId = topology.id as string
          const country = countryRecord[geoId]
          const hasPencil = !isUndefined(country)
          const isSelected = !isUndefined(activeCountries[geoId])
          const className = classNames(
            'Map-country',
            hasPencil && 'Map-has-pencil',
            isSelected && 'Map-selected',
          )
          const onClick = () => {
            if (isSelected) {
              updateFilter({ country: '' })
            } else if (hasPencil) {
              setFilter({ country: geoId })
            }
          }

          return (
            <path
              data-testid={geoId}
              key={geoId}
              className={className}
              d={topology.pathD}
              onClick={onClick}
            >
              {<title>{country?.name}</title>}
            </path>
          )
        })}
      </svg>
    </div>
  )
}

export default Map
