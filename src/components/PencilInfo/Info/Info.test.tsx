import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { mockPencil } from './Info.mock'
import Info from '.'
import store from '../../../store'

describe('<Info />', () => {
  const renderWithProviders = () => ({
    ...render(
      <Provider store={store}>
        <IntlProvider locale="en" defaultLocale="en">
          <Info pencil={mockPencil} />
        </IntlProvider>
      </Provider>,
    ),
    rerender: renderWithProviders,
    store,
  })

  it('should match snapshot', () => {
    const { container } = renderWithProviders()
    expect(container).toMatchSnapshot()
  })

  it('should update filter when link is cliked', () => {
    const { getByText, store } = renderWithProviders()
    const link = getByText('Пиноккио II')

    expect(store.getState()).toMatchObject({ filter: { display: '' } })
    fireEvent.click(link)
    expect(store.getState()).toMatchObject({ filter: { display: 'pinocchio-second' } })
  })
})
