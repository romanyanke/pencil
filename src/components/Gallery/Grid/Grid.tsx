import classNames from 'classnames'
import React, { SFC } from 'react'
import { useFilter } from '../../Filter/Filter.hooks'
import { GridProps } from './Grid.interface'

const Grid: SFC<GridProps> = ({ pencils }) => {
  const [, setFilter] = useFilter()

  return (
    <div className="Grid">
      {pencils.map(pencil => {
        return (
          <a
            href={`?display=${pencil.id}`}
            onClick={e => {
              e.preventDefault()
              setFilter({ display: pencil.id })
            }}
            className={classNames('GridItem', {
              size2: pencil.grid === 2,
              size3: pencil.grid === 3,
            })}
            key={pencil.id}
            title={pencil.title}
          >
            <img alt={pencil.title} src={pencil.grid === 1 ? pencil.preview : pencil.photos[0]} />
          </a>
        )
      })}
    </div>
  )
}

export default Grid
