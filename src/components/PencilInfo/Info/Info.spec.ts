import { getFilterFromLink } from './Info.utils'

describe('<Info />', () => {
  describe('getFilterFromLink', () => {
    it('should parse string to filter', () => {
      expect(getFilterFromLink('?display=pencil')).toEqual({ display: 'pencil' })
      expect(getFilterFromLink('?country=russia')).toEqual({ country: 'russia' })
      expect(getFilterFromLink('?tag=pencil-tag')).toEqual({ tag: 'pencil-tag' })

      expect(getFilterFromLink('?tag=pencil-tag&country=russia&display=pencil')).toEqual({
        country: 'russia',
        display: 'pencil',
        tag: 'pencil-tag',
      })
    })

    it('should ignore unknown properties and return null', () => {
      expect(getFilterFromLink('?foo=bar')).toBeNull()
      expect(getFilterFromLink('/foo/bar')).toBeNull()
    })
  })
})
