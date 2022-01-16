import { mapPayloadToPath } from './Feed.utils'

describe('Feed', () => {
  describe('mapPayloadToPath', () => {
    it('should ignore page equals 1', () => {
      expect(mapPayloadToPath({ page: 1 })).toBe('/')
      expect(mapPayloadToPath({ page: 2 })).toBe('/page/2/')
      expect(mapPayloadToPath({ page: 42 })).toBe('/page/42/')
    })

    it('should replace spacebar with dash and convert to lowercase', () => {
      expect(mapPayloadToPath({ tag: 'Hello World' })).toBe('/tags/hello-world/')
    })

    it('should return pathname', () => {
      expect(mapPayloadToPath()).toBe('/')
      expect(mapPayloadToPath({ tag: 'foo' })).toBe('/tags/foo/')
      expect(mapPayloadToPath({ tag: 'foo', page: 8 })).toBe('/tags/foo/page/8/')
      expect(mapPayloadToPath({ country: 'bar', page: 2 })).toBe('/geo/bar/page/2/')
    })
    test('using tag and country should throw', () => {
      expect(() => mapPayloadToPath({ country: 'foo', tag: 'bar' })).toThrow()
    })
  })
})
