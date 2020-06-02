import { render } from '@testing-library/react'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { useFilter } from './Filter.hooks'
import { Filter } from './Filter.interface'
import { getEmptyFilter } from './Filter.utils'
import { createTestStore } from '../../store'

describe('<Filter />', () => {
  describe('useFilter', () => {
    const useFilterResult = (
      initialFilter: Partial<Filter> = getEmptyFilter(),
      filterUpdate: Partial<Filter> = {},
    ): Filter => {
      const HookWrapper = () => {
        const [filter, { updateFilter }] = useFilter()

        useEffect(() => {
          updateFilter(filterUpdate)
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        return <span data-testid="output">{JSON.stringify(filter)}</span>
      }
      const { getByTestId } = render(
        <Provider store={createTestStore({ filter: initialFilter })}>
          <HookWrapper />
        </Provider>,
      )
      const text = getByTestId('output').textContent
      if (text) {
        return JSON.parse(text)
      }

      throw new Error()
    }

    it('should return empty filter', () => {
      expect(useFilterResult()).toEqual(getEmptyFilter())
    })

    it('should update display prop', () => {
      expect(useFilterResult({}, { display: 'pencil-id' })).toMatchObject({
        display: 'pencil-id',
      })
    })
    it('should update tag prop', () => {
      expect(useFilterResult({}, { tag: 'some-tag' })).toMatchObject({
        tag: 'some-tag',
      })
    })
    it('should update country prop', () => {
      expect(useFilterResult({}, { country: 'my-country' })).toMatchObject({
        country: 'my-country',
      })
    })
    it('should merge filter props', () => {
      expect(useFilterResult({ tag: 'some-tag' }, { country: 'my-country' })).toMatchObject({
        country: 'my-country',
        tag: 'some-tag',
      })
    })
  })
})
