import { geoPath, GeoRawProjection } from 'd3-geo'
import { geoProjection } from 'd3-geo'
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'
import { feature } from 'topojson-client'
import { Topology } from 'topojson-specification'
import { TopologyItem } from './Map.interface.js'
import geography from './world.json'

// TODO: how to get the type properly?
const topology: Topology = geography as any
const featureCollection = feature(topology, topology.objects.world) as FeatureCollection<
  Geometry,
  GeoJsonProperties
>

const timesRaw: GeoRawProjection = (lambda, phi) => {
  // https://github.com/d3/d3-geo-projection/blob/master/src/times.js
  const { PI, sin, tan } = Math
  const t = tan(phi / 2)
  const quarterPi = PI / 4
  const s = sin(quarterPi * t)

  return [lambda * (0.74482 - 0.34588 * s * s), 1.70711 * t]
}

const projection = () => geoProjection(timesRaw).translate([mapWidth / 2, mapHeight / 2 + 40])

export const mapWidth = 800
export const mapHeight = 400
export const topologies = featureCollection.features.map<TopologyItem>(geo => {
  const pathD = geoPath().projection(projection())(geo)
  if (pathD === null) {
    throw new Error()
  }

  return { ...geo, pathD }
})
