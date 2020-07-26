import { Feature, GeoJsonProperties, Geometry } from 'geojson'

export interface TopologyItem extends Feature<Geometry, GeoJsonProperties> {
  pathD: string
}
