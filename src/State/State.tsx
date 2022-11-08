import { PropsWithChildren, useEffect } from 'react'
import { StateContext, useStateContextValue, useStateInUrl } from './State.hooks'
import { useLanguage } from '../LanguageProvider/LanguageProvider.hooks'

const State = ({ children }: PropsWithChildren<{}>) => {
  const { language } = useLanguage()
  const value = useStateContextValue()

  useStateInUrl(value)

  useEffect(() => {
    if (value.state.language !== language) {
      value.setLanguage(language)
    }
  }, [language, value])

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

export default State
