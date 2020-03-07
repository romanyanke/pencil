import { isEmpty, pick } from 'lodash'
import qs from 'qs'
import { Filter } from './../../Filter/Filter.interface'
import { getEmptyFilter } from './../../Filter/Filter.utils'
import { Pencil } from '../../Pencil/Pencil.interface'

export const getFilterFromLink = (link: string): Filter | null => {
  const queryPart = link.split('?')[1]
  if (queryPart) {
    const emptyFilter = getEmptyFilter()
    const query = qs.parse(queryPart)
    const filterKeys = Object.keys(emptyFilter) as Array<keyof Filter>
    const keysFromQuery = pick<Filter, keyof Filter>(query, filterKeys)
    if (!isEmpty(keysFromQuery)) {
      return keysFromQuery
    }
  }

  return null
}

export const displayPencilLocation = ({ country, city }: Pick<Pencil, 'country' | 'city'>) =>
  [country.name, city].filter(Boolean).join(', ')
