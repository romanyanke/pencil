import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { appMessages } from '../App/App.messages'
import { useFilter } from '../Filter/Filter.hooks'
import { useCached, useNormalizedPencils } from '../Pencil/Pencil.hooks'
import { useCountriesNormalizedBy } from '../Taxonomy/Taxonomy.hooks'
import messages from './PageTitle.messages'

const PageTitle = () => {
  const [filter] = useFilter()
  const cached = useCached()
  const intl = useIntl()
  const normalizedPencils = useNormalizedPencils()
  const normalizedCoutries = useCountriesNormalizedBy('name')
  const pencil = normalizedPencils[filter.display]
  const flag = normalizedCoutries[filter.country]
    ? normalizedCoutries[filter.country].flag
    : undefined

  const count = filter.country && cached ? cached.pages.pencils : undefined

  useEffect(() => {
    if (pencil && flag) {
      const { title, country } = pencil
      document.title = intl.formatMessage(messages.pencil, { title, country: country.name, flag })
    } else if (filter.country && count) {
      document.title = intl.formatMessage(messages.country, {
        flag,
        country: filter.country,
        pencils: intl.formatMessage(appMessages.pencil, { count }),
      })
    } else {
      document.title = intl.formatMessage(messages.title)
    }
  }, [intl, pencil, count, filter, flag])

  return null
}

export default PageTitle
