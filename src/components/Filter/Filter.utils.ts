import pick from 'lodash/pick'
import pickBy from 'lodash/pickBy'
import qs from 'qs'
import { Filter } from './Filter.interface'

export const getEmptyFilter = (): Filter => ({
  country: '',
  display: '',
  tag: '',
})

export const mapFilterToQueryString = (filter: Partial<Filter>) =>
  qs.stringify(pickBy(filter, Boolean), { addQueryPrefix: true })

export const mapQueryStringToFilter = (querystring = window.location.search): Filter => {
  const input = qs.parse(querystring, { ignoreQueryPrefix: true })
  const emptyFilter = getEmptyFilter()
  const filterKeys = Object.keys(emptyFilter)
  const filter = pick(input, filterKeys)

  return { ...emptyFilter, ...filter }
}
