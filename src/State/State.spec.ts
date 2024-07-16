import { mapQueryToAppState, transformState } from './State.utils'

describe('State', () => {
  describe('transformState', () => {
    it('should keep given state', () => {
      expect(transformState({}).get()).toEqual({})
      expect(transformState({ display: 'one' }).get()).toEqual({ display: 'one' })
    })

    it('should add and remove values in state', () => {
      expect(transformState({}).add({ display: 'two' }).get()).toEqual({ display: 'two' })
      expect(transformState({ display: 'two' }).add({ country: 'RUS' }).get()).toEqual({
        display: 'two',
        country: 'RUS',
      })
      expect(transformState({}).add({ display: 'two' }).add({ display: 'three' }).get()).toEqual({
        display: 'three',
      })
    })
    it('should be chainable', () => {
      expect(
        transformState({ display: 'one' }).add({ country: 'RUS' }).omit('display').get(),
      ).toEqual({ country: 'RUS' })
    })
  })

  describe('mapQueryToAppState', () => {
    it('should parse query string to state', () => {
      const language = 'en'
      expect(mapQueryToAppState('?display=one')).toEqual({ display: 'one', language })
      expect(mapQueryToAppState('/?display=one')).toEqual({ display: 'one', language })
      expect(mapQueryToAppState('path/?display=one')).toEqual({ display: 'one', language })
      expect(mapQueryToAppState('/path/?display=one')).toEqual({ display: 'one', language })
      expect(mapQueryToAppState('http://localhost:3000/path/?display=one')).toEqual({ display: 'one', language })
    })
  })
})
