import React from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { useFilter } from '../Filter/Filter.hooks'
import { useCountriesNormalizedBy } from '../Taxonomy/Taxonomy.hooks'
import { mapGeoIdToStyle } from './Map.utils'
import geography from './world.json'

const Map = () => {
  const [filter, setFilter] = useFilter()
  const normalizedIds = useCountriesNormalizedBy('id')

  return (
    <div className="Map">
      <ComposableMap
        className="Map-block"
        height={400}
        projectionConfig={{ yOffset: 50, scale: 150 }}
      >
        <Geographies geography={geography} disableOptimization>
          {(geographies, projection) =>
            geographies.map((geo, index) => {
              // TODO @types/react-simple-maps type issue
              const geoId = (geo as any).id
              const country = normalizedIds[geoId] ? normalizedIds[geoId].name : null
              const hasPencil = country !== null
              const isSelected = country === filter.country

              return (
                <Geography
                  key={index}
                  geography={geo}
                  projection={projection}
                  onClick={country ? () => setFilter({ country }) : undefined}
                  style={mapGeoIdToStyle({ hasPencil, isSelected })}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}

export default Map
