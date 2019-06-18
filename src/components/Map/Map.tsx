import React from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { useFilter } from '../Filter/Filter.hooks'
import {
  useCountries,
  useCountriesNormalizedByGeoId,
  useCountriesNormalizedByName,
} from '../Taxonomy/Taxonomy.hooks'
import { mapGeoIdToStyle } from './Map.utils'
import geography from './world.json'

const Map = () => {
  const [filter, setFilter] = useFilter()
  const countries = useCountries()
  const geoIds = countries.map(({ id }) => id)

  const normalizedIds = useCountriesNormalizedByGeoId()
  const normalizedNames = useCountriesNormalizedByName()

  const onCountryClick = (geoId: string) => () => {
    setFilter({ country: normalizedIds[geoId] })
  }

  return (
    <div className="Map">
      <ComposableMap
        className="Map-block"
        height={400}
        projectionConfig={{
          yOffset: 50,
        }}
      >
        <Geographies geography={geography} disableOptimization>
          {(geographies, projection) => {
            return geographies.map((geo, index) => {
              // TODO issue types
              const geoId = (geo as any).id
              const hasPencil = geoIds.includes(geoId)
              const isSelected = normalizedNames[filter.country] === geoId
              return (
                <Geography
                  key={index}
                  geography={geo}
                  projection={projection}
                  onClick={hasPencil ? onCountryClick(geoId) : undefined}
                  style={mapGeoIdToStyle({ hasPencil, isSelected })}
                />
              )
            })
          }}
        </Geographies>
      </ComposableMap>
    </div>
  )
}

export default Map
