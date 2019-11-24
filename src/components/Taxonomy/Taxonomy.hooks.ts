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
