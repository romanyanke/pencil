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
      <button onClick={toggleTheme}>
        {isDark ? <span>🌕 {t('theme-dark')}</span> : <span>🌞 {t('theme-light')}</span>}
      </button>
      <br />
      <button
        onClick={() => {
          state.closeTag()
          toggleLocale()
        }}
      >
        {locale === 'en' ? <span>🇺🇸 Eng</span> : <span>🇷🇺 Рус</span>}
      </button>
    </details>
  )
}
