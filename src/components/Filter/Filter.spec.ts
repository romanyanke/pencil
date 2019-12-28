import { Filter } from './Filter.interface'
import { getEmptyFilter, mapFilterToQueryString, mapQueryStringToFilter } from './Filter.utils'

describe('<Filter />', () => {
  describe('getEmptyFilter', () => {
    it('should return empty filter', () => {
      expect(getEmptyFilter()).toEqual({ display: '', tag: '', country: '' })
    })
  })

  describe('mapFilterToQueryString', () => {
    it('should return empty string when filter is empty', () => {
      expect(mapFilterToQueryString({})).toEqual('')
    })

    it('should ignore emtpty values', () => {
      expect(mapFilterToQueryString(getEmptyFilter())).toEqual('')
    })

    it('should stringify filter values', () => {
      expect(mapFilterToQueryString({ display: 'A', tag: 'B', country: 'C' })).toBe(
        '?display=A&tag=B&country=C',
      )
    })
  })

  describe('mapQueryStringToFilter', () => {
    it('shoud return filter with empty values when query is empty', () => {
      expect(mapQueryStringToFilter('')).toEqual(getEmptyFilter())
    })

    it('should ignore unkown keys', () => {
      expect(mapQueryStringToFilter('?some=42&other=foo')).toEqual(getEmptyFilter())
    })

    it('should parse filter from string', () => {
      expect(mapQueryStringToFilter('?display=A&tag=B&country=C')).toEqual({
        display: 'A',
        tag: 'B',
        country: 'C',
      })
    })
  })

  describe('mapFilterToQueryString <-> mapQueryStringToFilter', () => {
    const initial: Filter = {
      display: 'some-id',
      tag: 'some-tag',
      country: 'some-country',
    }
    const stringified = mapFilterToQueryString(initial)
    const parsed = mapQueryStringToFilter(stringified)

    expect(parsed).toEqual(initial)
  })
})
