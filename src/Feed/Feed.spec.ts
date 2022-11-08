import { mapPayloadToPath } from './Feed.utils'

describe('Feed', () => {
  describe('mapPayloadToPath', () => {
    const locale = 'ru'

    it('should ignore page equals 1', () => {
      expect(mapPayloadToPath({ locale, page: 1 })).toBe('/')
      expect(mapPayloadToPath({ locale, page: 2 })).toBe('/page/2/')
      expect(mapPayloadToPath({ locale, page: 42 })).toBe('/page/42/')
    })

    it('should replace spacebar with dash and convert to lowercase', () => {
      expect(mapPayloadToPath({ locale, tag: 'Hello World' })).toBe('/tags/hello-world/')
    })

    it('should return pathname', () => {
      expect(mapPayloadToPath({ locale })).toBe('/')
      expect(mapPayloadToPath({ locale, tag: 'foo' })).toBe('/tags/foo/')
      expect(mapPayloadToPath({ locale, tag: 'foo', page: 8 })).toBe('/tags/foo/page/8/')
      expect(mapPayloadToPath({ locale, country: 'bar', page: 2 })).toBe('/geo/bar/page/2/')
    })
    test('using tag and country should throw', () => {
      expect(() => mapPayloadToPath({ locale, country: 'foo', tag: 'bar' })).toThrow()
    })

    it('should prefix en locale', () => {
      expect(mapPayloadToPath({ locale: 'en' })).toBe('/en/')
      expect(mapPayloadToPath({ locale: 'en', tag: 'tag-name' })).toBe('/en/tags/tag-name/')
    })
  })
})
