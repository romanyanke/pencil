import { defineMessages } from 'react-intl'

export const appMessages = defineMessages({
  pencil: {
    defaultMessage: `{count, plural,
      one {# карандаш}
      few {# карандаша}
      many {# карандашей}
    }`,
    id: 'App.pencil',
  },

  country: {
    defaultMessage: `{count, plural,
      one {# страны}
      few {# стран}
      many {# стран}
    }`,
    id: 'App.country',
  },

  error: {
    defaultMessage: 'не могу загрузить',
    id: 'App.error',
  },
})
