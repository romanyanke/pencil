import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    defaultMessage: `{pencils} из {countries}`,
    id: 'Filter.title',
  },

  option: {
    defaultMessage: `{flag}{country} {count}`,
    id: 'Filter.option',
  },

  all: {
    defaultMessage: 'Все страны',
    id: 'Filter.all',
  },
})
