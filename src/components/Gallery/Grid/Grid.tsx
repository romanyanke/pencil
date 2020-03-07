import classNames from 'classnames'
import React from 'react'
import { GridProps } from './Grid.interface'
import { useFilter } from '../../Filter/Filter.hooks'
import { mapFilterToQueryString } from '../../Filter/Filter.utils'

const Grid = ({ pencils }: GridProps) => {
  const [, setFilter] = useFilter()

  return (
    <div className="Grid">
      {pencils.map(pencil => {
        const thumbSize = pencil.preview
        const fullSize = pencil.photos[0]
        const useSize = pencil.grid === 1 ? thumbSize : fullSize
        const className = classNames('GridItem', {
          size2: pencil.grid === 2,
          size3: pencil.grid === 3,
        })
        const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          e.preventDefault()
          setFilter({ display: pencil.id })
        }

        return (
          <a
            href={mapFilterToQueryString({ display: pencil.id })}
            onClick={onClick}
            className={className}
            key={pencil.id}
            title={pencil.title}
          >
            <img srcSet={`${useSize}, ${fullSize} 2x`} alt={pencil.title} src={useSize} />
          </a>
        )
      })}
    </div>
  )
}

export default Grid
