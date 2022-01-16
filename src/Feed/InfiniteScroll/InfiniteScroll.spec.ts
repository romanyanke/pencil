import { checkFinishZone } from './InfiniteScroll.utils'

describe('<Gallery />', () => {
  describe('checkFinishZone', () => {
    it('should return false when progress is less than 60%', () => {
      expect(checkFinishZone(10, 0)).toBe(false)
      expect(checkFinishZone(10, 1)).toBe(false)
      expect(checkFinishZone(10, 2)).toBe(false)
      expect(checkFinishZone(10, 3)).toBe(false)
      expect(checkFinishZone(10, 4)).toBe(false)
      expect(checkFinishZone(10, 5)).toBe(false)
      expect(checkFinishZone(10, 6)).toBe(false)
    })
    it('should return true when progress is more than 60%', () => {
      expect(checkFinishZone(10, 7)).toBe(true)
      expect(checkFinishZone(10, 8)).toBe(true)
      expect(checkFinishZone(10, 9)).toBe(true)
      expect(checkFinishZone(10, 10)).toBe(true)
      expect(checkFinishZone(10, 11)).toBe(true)
    })
  })
})
