import classnames from 'classnames'
import classes from './Grid.module.css'
import { useFeed } from '../Feed.hooks'
import { mapAppStateToQuery } from '../../State/State.utils'
import { useAppState } from '../../State/State.hooks'

export const Grid = () => {
  const { pencils } = useFeed()
  const { openPencil } = useAppState()

  return (
    <div className={classes.root}>
      {pencils.map(pencil => {
        const size = pencil.grid
        const preview = pencil.photos[0]

        return (
          <a
            href={mapAppStateToQuery({ display: pencil.id })}
            onClick={e => {
              e.preventDefault()
              openPencil(pencil.id)
            }}
            className={classnames(
              classes.item,
              size === 2 && classes.size2,
              size === 3 && classes.size3,
            )}
            key={pencil.id}
            title={pencil.title}
          >
            <img alt={pencil.title} loading="lazy" src={preview} />
          </a>
        )
      })}
    </div>
  )
}
