import { Feature, GeoJsonProperties, Geometry } from 'geojson'

export interface MapGeoStyleProps {
  hasPencil: boolean
  isSelected: boolean
}

export interface TopologyItem extends Feature<Geometry, GeoJsonProperties> {
  pathD: string
}
