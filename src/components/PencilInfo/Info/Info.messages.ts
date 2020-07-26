import { defineMessages } from 'react-intl'

export default defineMessages({
  photo: {
    defaultMessage: '{count, number} фото',
    id: 'Info.photo',
  },
  location: {
    defaultMessage: `{flag} {country}, {city}`,
    id: 'Info.fullLocation',
  },
  unknown: {
    defaultMessage: 'Неизвестно откуда',
    id: 'Info.unknown',
  },
})
