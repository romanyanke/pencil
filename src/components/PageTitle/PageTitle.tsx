import React from 'react'
import { Helmet } from 'react-helmet'
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

  if (pencil) {
    const { title, country } = pencil
    const flag = normalizedCoutries[country.name]
      ? normalizedCoutries[country.name].flag
      : undefined

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

  if (filter.country && cached) {
    const flag = normalizedCoutries[filter.country]
      ? normalizedCoutries[filter.country].flag
      : undefined
    return (
      <Helmet>
        <title>
          {intl.formatMessage(messages.country, {
            flag,
            country: filter.country,
            pencils: intl.formatMessage(appMessages.pencil, {
              count: cached.pages.pencils,
            }),
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
