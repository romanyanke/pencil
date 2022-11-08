import { initReactI18next } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'
import i18n from 'i18next'
import translationEN from './locales/en.json'
import translationRU from './locales/ru.json'
import { Language } from './LanguageProvider.interface'

const fallback: Language = 'en'
const supported: Language[] = [fallback, 'ru']

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    detection: { lookupQuerystring: 'language' },
    supportedLngs: supported,
    fallbackLng: fallback,
    resources: {
      en: { translation: translationEN },
      ru: { translation: translationRU },
    },
    interpolation: { escapeValue: false },
  })

export const mapToLanguage = (input: unknown = i18n.language): Language => {
  if (supported.includes(input as Language)) {
    return input as Language
  }

  return fallback
}
