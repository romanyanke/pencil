import { useContext } from 'react'
import { TaxonomyContext } from './Taxonomy'

const useTaxonomyData = () => useContext(TaxonomyContext)

export const useCountries = () => useTaxonomyData().countries || []
export const useTags = () => useTaxonomyData().tags || []
export const useStatistic = () => useTaxonomyData().statistic
