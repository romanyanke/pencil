import classNames from 'classnames'
import isUndefined from 'lodash/isUndefined'
import React from 'react'
import { mapHeight, mapWidth, topologies } from './Map.utils'
import { useFilter } from '../Filter/Filter.hooks'
import { usePencilCache } from '../Pencil/Pencil.hooks'
import { useCountriesNormalizedBy, useCountryFlags } from '../Taxonomy/Taxonomy.hooks'

const Map = () => {
  const [, { setFilter, updateFilter }] = useFilter()
  const normalizedIds = useCountriesNormalizedBy('id')
  const cached = usePencilCache()
  const geoIds = cached?.geoIds ?? []
  const countryFlags = useCountryFlags(geoIds)

  return (
    <div className="Map">
      <div className="Map-flags">
        {countryFlags.map(flag => (
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
          const country = geoId ? normalizedIds[geoId]?.name : undefined
          const hasPencil = !isUndefined(country)
          const isSelected = geoIds.includes(geoId)
          const className = classNames(
            'Map-country',
            hasPencil && 'Map-has-pencil',
            isSelected && 'Map-selected',
          )
          const onClick = () => {
            if (isSelected) {
              updateFilter({ country: '' })
            } else if (country) {
              setFilter({ country })
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
              {country && <title>{country}</title>}
            </path>
          )
        })}
      </svg>
    </div>
  )
}

export default Map
