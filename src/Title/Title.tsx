import { useEffect, useRef } from 'react'
import classes from './Title.module.css'
import { useTitle } from './Title.hooks'
import { useAppState } from '../State/State.hooks'

export const Title = () => {
  const title = useTitle()
  const originalTitle = useRef(document.title)
  const { isFilterApplied, resetFilter } = useAppState()

  useEffect(() => {
    document.title = `${originalTitle.current}: ${title}`
  }, [title])

  return (
    <h2 className={classes.root}>
      {title}
      {isFilterApplied && (
        <a
          className={classes.clear}
          href="/"
          onClick={e => {
            e.preventDefault()
            resetFilter()
          }}
        >
          Показать все
        </a>
      )}
    </h2>
  )
}
export default Title
