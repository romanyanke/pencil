import { mapToLanguage } from './LanguageProvider.utils'

describe('LanguageProvider', () => {
  describe('mapToLanguage', () => {
    it('should return valid language as-is', () => {
      expect(mapToLanguage('en')).toBe('en')
      expect(mapToLanguage('ru')).toBe('ru')
    })

    it('should return fallback for invalid input', () => {
      expect(mapToLanguage('fr')).toBe('en')
      expect(mapToLanguage('invalid')).toBe('en')
      expect(mapToLanguage('')).toBe('en')
      expect(mapToLanguage(null)).toBe('en')
      expect(mapToLanguage(undefined)).toBe('en')
      expect(mapToLanguage(123)).toBe('en')
    })
  })
})
