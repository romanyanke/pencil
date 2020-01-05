import { getFilterFromLink, displayPencilLocation } from './Info.utils'

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

  describe('displayPencilLocation', () => {
    it('should display country and city', () => {
      expect(displayPencilLocation({ country: { name: 'Country', id: '' }, city: 'City' })).toBe(
        'Country, City',
      )
    })

    it('should remove empty values', () => {
      expect(displayPencilLocation({ country: { name: '', id: '' }, city: 'City' })).toBe('City')
      expect(displayPencilLocation({ country: { name: 'Country', id: '' }, city: '' })).toBe(
        'Country',
      )
    })
  })
})
