import daynight from 'daynight'
import { useEffect, useReducer } from 'react'

export const Theme = () => {
  const [isDark, toggle] = useReducer(state => !state, daynight().dark)

  useEffect(() => {
    document.body.classList.toggle('day', !isDark)
    document.body.classList.toggle('night', isDark)

    const color = getComputedStyle(document.body).getPropertyValue('--background')

    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color)
  }, [isDark])

  return <button onClick={toggle}>{isDark ? <span>🌞</span> : <span>🌛</span>}</button>
}
