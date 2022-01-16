import { useTaxonomyQuery } from '../api'

const useTaxonomyData = () => {
  const { data } = useTaxonomyQuery()

  if (!data) {
    throw new Error('Taxonomy is not ready')
  }

  return data
}

export const useCountries = () => useTaxonomyData().countries || []
export const useTags = () => useTaxonomyData().tags || []
export const useStatistic = () => useTaxonomyData().statistic
