import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import messages from './PageTitle.messages'
import { appMessages } from '../App/App.messages'
import { useFilter } from '../Filter/Filter.hooks'
import { useNormalizedPencils, usePencilCache } from '../Pencil/Pencil.hooks'
import { useCountryRecord } from '../Taxonomy/Taxonomy.hooks'

const PageTitle = () => {
  const [filter] = useFilter()
  const intl = useIntl()
  const normalizedPencils = useNormalizedPencils()
  const cache = usePencilCache()

  const pencil = normalizedPencils[filter.display]
  const countryRecord = useCountryRecord()
  const counry = countryRecord[filter.country]

  useEffect(() => {
    if (pencil) {
      if (pencil.country) {
        const { flag, name } = pencil.country
        document.title = intl.formatMessage(messages.pencil, {
          title: pencil.title,
          flag,
          country: name,
        })
      } else {
        document.title = pencil.title
      }
    } else if (filter.country && counry) {
      document.title = intl.formatMessage(messages.country, {
        countryFlag: counry.flag,
        country: counry.name,
        pencils: intl.formatMessage(appMessages.pencil, { count: counry.pencils }),
      })
    } else if (filter.tag && cache) {
      const pencilCount = cache.pages.pencils
      const countryCount = cache.geo.length

      document.title = intl.formatMessage(messages.tag, {
        tag: filter.tag,
        countries: intl.formatMessage(appMessages.country, { count: countryCount }),
        pencils: intl.formatMessage(appMessages.pencil, { count: pencilCount }),
      })
    } else {
      document.title = intl.formatMessage(messages.title)
    }
  }, [intl, pencil, filter, counry, cache])

  return null
}

export default PageTitle
