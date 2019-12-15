import { pickBy } from 'lodash'
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
  return { ...getEmptyFilter(), ...input }
}

export const getInitialFilter = (): Filter => ({
  ...getEmptyFilter(),
  ...mapQueryStringToFilter(),
})
