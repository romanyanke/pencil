import isUndefined from 'lodash/isUndefined'
import mapKeys from 'lodash/mapKeys'
import classnames from 'classnames'
import { mapHeight, mapWidth, topologies } from './Map.utils'
import classes from './Map.module.css'
import { useCountries } from '../Taxonomy/Taxonomy.hooks'
import { useAppState } from '../State/State.hooks'
import { useFeed } from '../Feed/Feed.hooks'

export const Map = () => {
  const counties = useCountries()
  const { openCountry, closeCountry } = useAppState()
  const { activeGeo } = useFeed()
  const countryRecord = mapKeys(counties, ({ geo }) => geo)
  const filterCountries = activeGeo.map(geo => countryRecord[geo])

  const activeCountries = mapKeys(filterCountries, ({ geo }) => geo)

  return (
    <div className={classes.map}>
      <div className={classes.flags}>
        {filterCountries.map(({ flag }) => (
          <span key={flag}>{flag}</span>
        ))}
      </div>
      <svg
        width={mapWidth}
        height={mapHeight}
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        className={classes.block}
      >
        {topologies.map(topology => {
          const geoId = topology.id as string
          const country = countryRecord[geoId]
          const hasPencil = !isUndefined(country)
          const isSelected = !isUndefined(activeCountries[geoId])
          const className = classnames(
            classes.country,
            hasPencil && classes.pencil,
            isSelected && classes.selected,
          )
          const onClick = () => {
            if (isSelected) {
              closeCountry()
            } else if (hasPencil) {
              openCountry(geoId)
            }
          }

          return (
            <path
              data-testid={geoId}
              key={geoId}
              className={className}
              d={topology.pathD}
              onClick={hasPencil ? onClick : () => alert(geoId)}
              style={{ fill: hasPencil ? undefined : getRandomColor() }}
            >
              <title>
                {country?.name} {geoId}
              </title>
            </path>
          )
        })}
      </svg>
    </div>
  )
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  return color
}
