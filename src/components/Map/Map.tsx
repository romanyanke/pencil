import classNames from 'classnames'
import React from 'react'
import { useFilter } from '../Filter/Filter.hooks'
import { useCountriesNormalizedBy } from '../Taxonomy/Taxonomy.hooks'
import { mapHeight, mapWidth, topologies } from './Map.utils'

const Map = () => {
  const [filter, setFilter] = useFilter()
  const normalizedIds = useCountriesNormalizedBy('id')

  return (
    <div className="Map">
      <svg
        width={mapWidth}
        height={mapHeight}
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        className="Map-block"
      >
        {topologies.map(topology => {
          const geoId = topology.id
          const country = geoId && normalizedIds[geoId] ? normalizedIds[geoId].name : null
          const hasPencil = country !== null
          const isSelected = country === filter.country

          return (
            <path
              key={geoId}
              d={topology.pathD}
              onClick={() => {
                if (isSelected) {
                  setFilter({ country: '' })
                } else if (country) {
                  setFilter({ country })
                }
              }}
              className={classNames(
                'Map-country',
                hasPencil && 'Map-has-pencil',
                isSelected && 'Map-selected',
              )}
            />
          )
        })}
      </svg>
    </div>
  )
}

export default Map
