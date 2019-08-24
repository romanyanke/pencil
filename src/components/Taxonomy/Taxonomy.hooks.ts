import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '../../store'
import { Pencil, PencilCountry } from './../Pencil/Pencil.interface'
import { TaxonomyAppStore } from './Taxonomy.interface'

export const useTaxonomy = () => useSelector<AppStore, TaxonomyAppStore>(store => store.taxonomy)
export const useTaxonomyRequestStatus = () => useTaxonomy().requestStatus

export const usePencilFlag = (pencil: Pencil) => {
  const normalizedCountries = useCountriesNormalizedBy('id')
  const countryId = pencil.country.id
  if (normalizedCountries[countryId]) {
    return normalizedCountries[countryId].flag
  }

  return null
}

export const useCountriesNormalizedBy = <K extends keyof PencilCountry>(field: K) => {
  const { countries } = useTaxonomy()
  return useMemo(
    () =>
      countries.reduce<Record<string, PencilCountry>>(
        (normalized, country) => ({
          ...normalized,
          [country[field]]: country,
        }),
        {},
      ),
    [countries, field],
  )
}
