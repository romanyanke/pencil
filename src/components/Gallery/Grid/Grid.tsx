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
          <button
            onClick={() => {
              setFilter({ display: pencil.id })
            }}
            className={classNames('GridItem', {
              size2: pencil.grid === 2,
              size3: pencil.grid === 3,
            })}
            key={pencil.id}
          >
            <img alt={pencil.id} src={pencil.grid === 1 ? pencil.preview : pencil.photos[0]} />
          </button>
        )
      })}
    </div>
  )
}

export default Grid
