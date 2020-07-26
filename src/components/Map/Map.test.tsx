import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import Map from '.'
import { createTestStore } from '../../store'

describe('<Map />', () => {
  const renderWithProviders = (partialState: ArgumentType<typeof createTestStore> = {}) => {
    const store = createTestStore(partialState)

    return {
      store,
      ...render(
        <Provider store={store}>
          <Map />
        </Provider>,
      ),
      rerender: renderWithProviders,
    }
  }

  it('should match snapshot', () => {
    const { container } = renderWithProviders()
    expect(container).toMatchSnapshot()
  })

  it('should update filter when country with a pencil is clicked', () => {
    const { getByTestId, store } = renderWithProviders({
      taxonomy: { countries: [{ geo: 'RUS', name: 'Россия' }] },
    })

    const country = getByTestId('RUS')
    expect(store.getState()).toMatchObject({ filter: { country: '' } })
    fireEvent.click(country)
    expect(store.getState()).toMatchObject({ filter: { country: 'RUS' } })
  })

  it('should drop tag filter when country is set', () => {
    const { getByTestId, store } = renderWithProviders({
      taxonomy: { countries: [{ geo: 'RUS', name: 'Россия' }] },
      filter: { tag: 'my-tag' },
    })

    const country = getByTestId('RUS')
    expect(store.getState()).toMatchObject({ filter: { tag: 'my-tag' } })
    fireEvent.click(country)
    expect(store.getState()).toMatchObject({ filter: { tag: '' } })
  })
})
