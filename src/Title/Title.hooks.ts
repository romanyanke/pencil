import startCase from 'lodash/startCase'
import { useTranslation } from 'react-i18next'
import { useFeed } from '../Feed/Feed.hooks'
import { useAppState } from '../State/State.hooks'
import { useCountries, useTags } from '../Taxonomy/Taxonomy.hooks'

export const useSubtitle = () => {
  const { t } = useTranslation()
  const { state } = useAppState()
  const { query } = useFeed()
  const countries = useCountries()
  const tags = useTags()

  const country = countries.find(country => country.geo === state.country)
  const tag = tags.find(tag => startCase(tag.name) === startCase(state.tag))

  const subtitle = (() => {
    if (query.isLoading) {
      return t('loading')
    }
    if (country) {
      return `${country.name}. ${t('pencils', { count: country.pencils })}`
    }
    if (tag) {
      return `${startCase(tag.name)}. ${t('pencils', { count: tag.pencils })}`
    }

    return t('all-pencils')
  })()

  return subtitle
}
