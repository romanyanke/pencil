import { mapQueryToAppState, mapAppStateToQuery, stateReducer, omitStateKey, transformState } from './State.utils'

describe('State', () => {
  describe('stateReducer', () => {
    it('should handle reset action', () => {
      expect(stateReducer({ display: 'old' }, { type: 'reset', state: { tag: 'new' } })).toEqual({ tag: 'new' })
      expect(stateReducer({ display: 'old' }, { type: 'reset' })).toEqual({})
    })

    it('should handle language action', () => {
      expect(stateReducer({}, { type: 'language', language: 'ru' })).toEqual({ language: 'ru' })
      expect(stateReducer({ display: 'x' }, { type: 'language', language: 'en' })).toEqual({ display: 'x', language: 'en' })
    })

    it('should handle open:pencil action', () => {
      expect(stateReducer({}, { type: 'open:pencil', pencilId: '123' })).toEqual({ display: '123' })
      expect(stateReducer({ tag: 'art' }, { type: 'open:pencil', pencilId: '456' })).toEqual({ tag: 'art', display: '456' })
    })

    it('should handle open:country action and reset other filters', () => {
      expect(stateReducer({ tag: 'art' }, { type: 'open:country', geoId: 'RUS' })).toEqual({ country: 'RUS' })
    })

    it('should handle open:tag action and reset other filters', () => {
      expect(stateReducer({ country: 'RUS' }, { type: 'open:tag', tag: 'art' })).toEqual({ tag: 'art' })
    })

    it('should handle close:pencil action', () => {
      expect(stateReducer({ display: '123', tag: 'art' }, { type: 'close:pencil' })).toEqual({ tag: 'art' })
    })

    it('should handle close:country action', () => {
      expect(stateReducer({ country: 'RUS', display: '123' }, { type: 'close:country' })).toEqual({ display: '123' })
    })

    it('should handle close:tag action', () => {
      expect(stateReducer({ tag: 'art', display: '123' }, { type: 'close:tag' })).toEqual({ display: '123' })
    })
  })

  describe('omitStateKey', () => {
    it('should remove specified key from state', () => {
      expect(omitStateKey({ display: '123', tag: 'art' }, 'display')).toEqual({ tag: 'art' })
      expect(omitStateKey({ country: 'RUS' }, 'country')).toEqual({})
    })
  })

  describe('mapAppStateToQuery', () => {
    it('should convert state to query string', () => {
      expect(mapAppStateToQuery({})).toBe('')
      expect(mapAppStateToQuery({ display: '123' })).toBe('?display=123')
      expect(mapAppStateToQuery({ tag: 'hello world' })).toBe('?tag=hello%20world')
    })

    it('should handle multiple keys', () => {
      const result = mapAppStateToQuery({ display: '123', tag: 'art' })
      expect(result).toContain('display=123')
      expect(result).toContain('tag=art')
    })
  })

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
