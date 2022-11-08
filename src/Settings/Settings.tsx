import { useTranslation } from 'react-i18next'
import classes from './Settings.module.css'
import { useTheme } from '../Theme/Theme.hooks'
import { useLanguage } from '../LanguageProvider/LanguageProvider.hooks'
import { useAppState } from '../State/State.hooks'

export const Settings = () => {
  const { t } = useTranslation()
  const { isDark, toggleTheme } = useTheme()
  const state = useAppState()
  const { language: locale, toggleLanguage: toggleLocale } = useLanguage()

  return (
    <details className={classes.root}>
      <summary>⚙️</summary>
      <button onClick={toggleTheme}>{t(isDark ? 'theme-dark' : 'theme-light')}</button>
      <br />
      <button
        onClick={() => {
          state.closeTag()
          toggleLocale()
        }}
      >
        {locale === 'en' ? 'English' : 'Русский'}
      </button>
    </details>
  )
}
