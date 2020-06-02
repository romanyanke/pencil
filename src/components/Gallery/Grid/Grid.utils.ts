import { ImgHTMLAttributes } from 'react'
import { PencilGridSize } from '../../Pencil/Pencil.interface'

export const getGridImageSources = (
  size: PencilGridSize,
  fullSrc: string,
  thumbSrc: string,
): ImgHTMLAttributes<{}> => {
  switch (size) {
    case 3:
      return { src: fullSrc }

    case 2:
      return { src: thumbSrc, srcSet: `${thumbSrc}, ${fullSrc} 2x` }

    default:
      return { src: thumbSrc }
  }
}
