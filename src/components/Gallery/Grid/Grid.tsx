import classNames from 'classnames'
import React from 'react'
import { GridProps } from './Grid.interface'
import { getGridImageSources } from './Grid.utils'
import { useFilter } from '../../Filter/Filter.hooks'
import { mapFilterToQueryString } from '../../Filter/Filter.utils'

const Grid = ({ pencils }: GridProps) => {
  const [, { openPencil }] = useFilter()

  return (
    <div className="Grid">
      {pencils.map(pencil => {
        const size = pencil.grid
        const thumbSrc = pencil.preview
        const fullSrc = pencil.photos[0]
        const className = classNames('GridItem', size === 2 && 'size2', size === 3 && 'size3')
        const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          e.preventDefault()
          openPencil(pencil.id)
        }

        return (
          <a
            href={mapFilterToQueryString({ display: pencil.id })}
            onClick={onClick}
            className={className}
            key={pencil.id}
            title={pencil.title}
          >
            <img alt={pencil.title} {...getGridImageSources(size, fullSrc, thumbSrc)} />
          </a>
        )
      })}
    </div>
  )
}

export default Grid
