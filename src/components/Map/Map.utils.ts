import { GeographyProps } from 'react-simple-maps'
import { MapGeoStyleProps } from './Map.interface'

const lightGrey = '#eceff1'
const blue = '#309cd0'
const darkBlue = '#226a8c'
const red = '#ff5722'

export const mapGeoIdToStyle = ({
  hasPencil,
  isSelected,
}: MapGeoStyleProps): GeographyProps['style'] => ({
  default: {
    fill: isSelected ? red : hasPencil ? blue : lightGrey,
    outline: 'none',
  },
  hover: {
    fill: isSelected ? red : hasPencil ? darkBlue : lightGrey,
    cursor: hasPencil ? 'pointer' : 'default',
    outline: 'none',
  },
  pressed: { fill: isSelected ? red : hasPencil ? darkBlue : lightGrey, outline: 'none' },
})
