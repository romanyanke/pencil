import classNames from 'classnames'
import { isUndefined } from 'lodash'
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
          const country = geoId ? normalizedIds[geoId]?.name : undefined
          const hasPencil = !isUndefined(country)
          const isSelected = country === filter.country
          const className = classNames(
            'Map-country',
            hasPencil && 'Map-has-pencil',
            isSelected && 'Map-selected',
          )
          const onClick = () => {
            if (isSelected) {
              setFilter({ country: '' })
            } else if (country) {
              setFilter({ country })
            }
          }

          return <path key={geoId} className={className} d={topology.pathD} onClick={onClick} />
        })}
      </svg>
    </div>
  )
}

export default Map
