import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import mapKeys from 'lodash/mapKeys'
import { taxonomyActions, taxonomySelector } from './Taxonomy.actions'

export const useTaxonomy = () => useSelector(taxonomySelector)

export const useTaxonomyRequest = () => {
  const dispatch = useDispatch()
  const { pending, failure } = useTaxonomy()

  useEffect(() => {
    dispatch(taxonomyActions.request())
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
