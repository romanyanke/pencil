import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    defaultMessage: 'В коробке с карандашами',
    id: 'PageTitle.title',
  },

  pencil: {
    defaultMessage: '{flag} {title}, {country}',
    id: 'PageTitle.pencil',
  },

  country: {
    defaultMessage: '{flag} {country}. {pencils}',
    id: 'PageTitle.country',
  },
})
