import isEmpty from 'lodash/isEmpty'
import pick from 'lodash/pick'
import qs from 'qs'
import { Filter } from './../../Filter/Filter.interface'
import { getEmptyFilter } from './../../Filter/Filter.utils'
import { Pencil } from '../../Pencil/Pencil.interface'

export const getFilterFromLink = (querystring: string): Filter | null => {
  const parsed = qs.parse(querystring, { ignoreQueryPrefix: true }) as {}
  const filterKeys = Object.keys(getEmptyFilter())
  const filter = pick(parsed, filterKeys) as Filter

  if (!isEmpty(filter)) {
    return filter
  }

  return null
}

export const displayPencilLocation = ({ country, city }: Pick<Pencil, 'country' | 'city'>) =>
  [country.name, city].filter(Boolean).join(', ')
