import classes from './Siblings.module.css'
import { mapAppStateToQuery } from '../../State/State.utils'
import { usePencilSiblings } from '../Pencil.hooks'

const Siblings = () => {
  const [prev, next] = usePencilSiblings()

  return (
    <div className={classes.root}>
      {prev && (
        <a
          key={prev.photos[0]}
          href={mapAppStateToQuery({ display: prev.id })}
          style={{ backgroundImage: `url(${prev.photos[0]})` }}
        />
      )}
      {next && (
        <a
          key={next.photos[0]}
          href={mapAppStateToQuery({ display: next.id })}
          style={{ backgroundImage: `url(${next.photos[0]})` }}
        />
      )}
    </div>
  )
}

export default Siblings
