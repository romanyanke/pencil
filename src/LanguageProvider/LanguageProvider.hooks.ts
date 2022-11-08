import { useContext } from 'react'
import { LanguageContext } from './LanguageProvider'

export const useLanguage = () => useContext(LanguageContext)
