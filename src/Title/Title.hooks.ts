import startCase from 'lodash/startCase'
import { formatPlural } from '../App/App.utils'
import { useFeed } from '../Feed/Feed.hooks'
import { useAppState } from '../State/State.hooks'
import { useCountries, useTags } from '../Taxonomy/Taxonomy.hooks'

export const useTitle = () => {
  const { state } = useAppState()
  const { query } = useFeed()
  const countries = useCountries()
  const tags = useTags()

  const country = countries.find(country => country.geo === state.country)
  const tag = tags.find(tag => startCase(tag.name) === startCase(state.tag))

  const title = (() => {
    if (query.isLoading) {
      return 'Загрузка…'
    }
    if (country) {
      return `${country.name}. ${formatPlural.pencil(country.pencils)}`
    }
    if (tag) {
      return `${startCase(tag.name)}. ${formatPlural.pencil(tag.pencils)}`
    }

    return 'Все карандаши'
  })()

  return title
}
