import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import messages from './PageTitle.messages'
import { appMessages } from '../App/App.messages'
import { useFilter } from '../Filter/Filter.hooks'
import { usePencilCache, useNormalizedPencils } from '../Pencil/Pencil.hooks'
import { useCountriesNormalizedBy, usePencilFlag } from '../Taxonomy/Taxonomy.hooks'

const PageTitle = () => {
  const [filter] = useFilter()
  const cached = usePencilCache()
  const intl = useIntl()
  const normalizedPencils = useNormalizedPencils()
  const normalizedCoutries = useCountriesNormalizedBy('name')
  const pencil = normalizedPencils[filter.display]
  const countryFlag = normalizedCoutries[filter.country]?.flag
  const pencilFlag = usePencilFlag(pencil)
  const count = cached?.pages.pencils

  useEffect(() => {
    if (pencil && pencilFlag) {
      const { title, country } = pencil
      document.title = intl.formatMessage(messages.pencil, {
        title,
        country: country.name,
        pencilFlag,
      })
    } else if (filter.country && count) {
      document.title = intl.formatMessage(messages.country, {
        countryFlag,
        country: filter.country,
        pencils: intl.formatMessage(appMessages.pencil, { count }),
      })
    } else {
      document.title = intl.formatMessage(messages.title)
    }
  }, [intl, pencil, count, filter, countryFlag, pencilFlag])

  return null
}

export default PageTitle
