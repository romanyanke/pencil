import { PropsWithChildren } from 'react'
import classes from './Loader.module.css'
import Globe from '../Globe'
import { useTaxonomyQuery } from '../api'

const Loader = ({ children }: PropsWithChildren<{}>) => {
  const { isError, isSuccess } = useTaxonomyQuery()

  if (isSuccess) {
    return <>{children}</>
  }

  return (
    <div className={classes.root}>
      {isError ? (
        <p>Ошибка 🙈</p>
      ) : (
        <p>
          Загружаю <Globe animated />
        </p>
      )}
    </div>
  )
}

export default Loader
