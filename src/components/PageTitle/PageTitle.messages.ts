import { defineMessages } from 'react-intl'

export default defineMessages({
  title: {
    defaultMessage: 'В коробке с карандашами',
    id: 'PageTitle.title',
  },

  pencil: {
    defaultMessage: '{pencilFlag} {title}, {country}',
    id: 'PageTitle.pencil',
  },

  country: {
    defaultMessage: '{countryFlag} {country}. {pencils}',
    id: 'PageTitle.country',
  },
})
