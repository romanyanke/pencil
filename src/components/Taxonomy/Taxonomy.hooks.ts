import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import mapKeys from 'lodash/mapKeys'
import { TaxonomyAppStore } from './Taxonomy.interface'
import { taxonomyActions } from './Taxonomy.actions'
import { AppStore } from '../../store'

export const useTaxonomy = () => useSelector<AppStore, TaxonomyAppStore>(store => store.taxonomy)

export const useTaxonomyRequest = () => {
  const dispatch = useDispatch()
  const { pending, failure } = useTaxonomy()

  useEffect(() => {
    dispatch(taxonomyActions.requestTaxonomy.request())
  }, [dispatch])

  return { pending, failure }
}

export const useCountries = () => {
  const { countries } = useTaxonomy()

  return countries
}

export const useCountryRecord = () => {
  const countries = useCountries()

  return mapKeys(countries, ({ geo }) => geo)
}
