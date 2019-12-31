import { mapKeys, compact } from 'lodash'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore } from '../../store'
import { Pencil, PencilCountry } from './../Pencil/Pencil.interface'
import { taxonomyActions } from './Taxonomy.actions'
import { TaxonomyAppStore } from './Taxonomy.interface'

export const useTaxonomy = () => useSelector<AppStore, TaxonomyAppStore>(store => store.taxonomy)

export const useTaxonomyRequest = () => {
  const dispatch = useDispatch()
  const requestStatus = useTaxonomy().requestStatus

  useEffect(() => {
    dispatch(taxonomyActions.requestTaxonomy.request())
  }, [dispatch])

  return requestStatus
}

export const usePencilFlag = (pencil: Pencil) => {
  const normalizedCountries = useCountriesNormalizedBy('id')
  const countryId = pencil.country.id

  return normalizedCountries[countryId]?.flag
}

export const useCountryFlags = (geoIds: string[]) => {
  const normalizedCountries = useCountriesNormalizedBy('id')

  return compact(geoIds.map(geoId => normalizedCountries[geoId]?.flag))
}

export const useCountriesNormalizedBy = <K extends keyof PencilCountry>(
  field: K,
): Partial<Record<string, PencilCountry>> => {
  const { countries } = useTaxonomy()

  return useMemo(() => mapKeys(countries, field), [countries, field])
}
