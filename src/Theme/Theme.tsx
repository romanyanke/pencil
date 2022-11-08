import daynight from 'daynight'
import { createContext, PropsWithChildren, useEffect, useReducer } from 'react'
import { ThemeProviderData } from './Theme.interface'

export const ThemeContext = createContext<ThemeProviderData>(null as any)

export const Theme = ({ children }: PropsWithChildren) => {
  const [isDark, toggleTheme] = useReducer(state => !state, daynight().dark)

  useEffect(() => {
    document.body.classList.toggle('day', !isDark)
    document.body.classList.toggle('night', isDark)
    document.documentElement.style.setProperty('color-scheme', isDark ? 'dark' : 'light')

    const color = getComputedStyle(document.body).getPropertyValue('--background')

    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color)
  }, [isDark])

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}
