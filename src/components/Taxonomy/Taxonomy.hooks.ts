import compact from 'lodash/compact'
import mapKeys from 'lodash/mapKeys'
import { useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Pencil, PencilCountry } from './../Pencil/Pencil.interface'
import { TaxonomyAppStore } from './Taxonomy.interface'
import { taxonomyActions } from './Taxonomy.actions'
import { AppStore } from '../../store'

export const useTaxonomy = () => useSelector<AppStore, TaxonomyAppStore>(store => store.taxonomy)

export const useTaxonomyRequest = () => {
  const dispatch = useDispatch()
  const { loading, failure } = useTaxonomy()

  useEffect(() => {
    dispatch(taxonomyActions.requestTaxonomy.request())
  }, [dispatch])

  return { loading, failure }
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
