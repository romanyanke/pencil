import { pick, pickBy } from 'lodash'
import qs from 'qs'
import { Filter } from './Filter.interface'

export const getEmptyFilter = (): Filter => ({
  display: '',
  country: '',
  tag: '',
})

export const mapFilterToQueryString = (filter: Partial<Filter>): string => {
  const query = qs.stringify(pickBy(filter, Boolean))
  return query ? '?' + query : ''
}

export const mapQueryStringToFilter = (querystring = window.location.search): Filter => {
  const input = qs.parse(querystring, { ignoreQueryPrefix: true })
  const emptyFilter = getEmptyFilter()
  const filterKeys = Object.keys(emptyFilter)
  const filter = pick(input, filterKeys)

  return { ...emptyFilter, ...filter }
}

export const getInitialFilter = (): Filter => ({
  ...getEmptyFilter(),
  ...mapQueryStringToFilter(),
})
