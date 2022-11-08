import { useTranslation } from 'react-i18next'
import { createContext, PropsWithChildren } from 'react'
import { Language, LanguageProviderData } from './LanguageProvider.interface'
import { mapToLanguage } from './LanguageProvider.utils'

export const LanguageContext = createContext<LanguageProviderData>(null as any)

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const { i18n } = useTranslation()
  const swap = (input: Language): Language => (input === 'en' ? 'ru' : 'en')

  const language = mapToLanguage(i18n.language)
  const toggleLanguage = (force?: Language) => i18n.changeLanguage(force || swap(language))

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
