import { GeographyProps } from 'react-simple-maps'
import { MapGeoStyleProps } from './Map.interface'

const baseStyle: React.CSSProperties = {
  stroke: '#607D8B',
  strokeWidth: 0.75,
  outline: 'none',
}

const lightGrey = '#eceff1'
const grey = '#cfd8dc'
const blue = '#309cd0'
const darkBlue = '#226a8c'
const red = '#ff5722'

export const mapGeoIdToStyle = ({
  hasPencil,
  isSelected,
}: MapGeoStyleProps): GeographyProps['style'] => ({
  default: {
    fill: isSelected ? red : hasPencil ? blue : lightGrey,
    ...baseStyle,
  },
  hover: {
    fill: isSelected ? red : hasPencil ? darkBlue : grey,
    cursor: hasPencil ? 'pointer' : 'default',
    ...baseStyle,
  },
  pressed: { fill: isSelected ? red : hasPencil ? darkBlue : grey, ...baseStyle },
})
