import classnames from 'classnames'
import { getGridImageSources } from './Grid.utils'
import classes from './Grid.module.css'
import { useFeed } from '../Feed.hooks'
import { mapAppStateToQuery } from '../../State/State.utils'
import { useAppState } from '../../State/State.hooks'

const Grid = () => {
  const { pencils } = useFeed()
  const { openPencil } = useAppState()

  return (
    <div className={classes.root}>
      {pencils.map(pencil => {
        const size = pencil.grid
        const thumbSrc = pencil.preview
        const fullSrc = pencil.photos[0]

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
            <img
              alt={pencil.title}
              loading="lazy"
              {...getGridImageSources(size, fullSrc, thumbSrc)}
            />
          </a>
        )
      })}
    </div>
  )
}

export default Grid
