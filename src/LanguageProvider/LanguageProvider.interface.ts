export interface LanguageProviderData {
  language: Language
  toggleLanguage(force?: Language): void
}

export type Language = 'en' | 'ru'
