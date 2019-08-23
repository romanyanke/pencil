import React from 'react'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'
import { useFilter } from '../Filter/Filter.hooks'
import { useNormalizedPencils } from '../Pencil/Pencil.hooks'
import { useCountriesNormalizedBy } from '../Taxonomy/Taxonomy.hooks'
import messages from './PageTitle.messages'

const PageTitle = () => {
  const [filter] = useFilter()
  const intl = useIntl()
  const normalizedPencils = useNormalizedPencils()
  const normalizedCoutries = useCountriesNormalizedBy('id')
  const pencil = normalizedPencils[filter.display]

  if (pencil) {
    const { title, country } = pencil
    const flag = normalizedCoutries[country.id] ? normalizedCoutries[country.id].flag : undefined

    return (
      <Helmet>
        <title>
          {intl.formatMessage(messages.pencil, {
            title,
            country: country.name,
            flag,
          })}
        </title>
      </Helmet>
    )
  }

  return (
    <Helmet>
      <title>{intl.formatMessage(messages.title)}</title>
    </Helmet>
  )
}

export default PageTitle
