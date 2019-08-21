import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    defaultMessage: `{pencils} из {countries}`,
    id: 'Filter.title',
  },

  current: {
    defaultMessage: `{country}: {pencils}`,
    id: 'Filter.current',
  },

  all: {
    defaultMessage: 'Все страны',
    id: 'Filter.all',
  },
})
