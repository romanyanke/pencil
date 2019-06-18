import { useSelector } from 'react-redux'
import { AppStore } from '../../store'
import { TaxonomyAppStore } from './Taxonomy.interface'

export const useTaxonomy = () => useSelector<AppStore, TaxonomyAppStore>(store => store.taxonomy)
export const useTaxonomyRequestStatus = () => useTaxonomy().requestStatus
export const useCountries = () => useTaxonomy().countries

export const useCountriesNormalizedByGeoId = () =>
  useCountries().reduce<Record<string, string>>(
    (normalized, country) => ({
      ...normalized,
      [country.id]: country.name,
    }),
    {},
  )

export const useCountriesNormalizedByName = () =>
  useCountries().reduce<Record<string, string>>(
    (normalized, country) => ({
      ...normalized,
      [country.name]: country.id,
    }),
    {},
  )

export const useTags = () => useTaxonomy().tags
