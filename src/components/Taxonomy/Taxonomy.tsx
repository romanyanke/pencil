import React, { SFC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { requestTaxonomy } from './Taxonomy.actions'
import { useTaxonomyRequestStatus } from './Taxonomy.hooks'
import { TaxonomyProps } from './Taxonomy.interface'

const Taxonomy: SFC<TaxonomyProps> = ({ children }) => {
  const dispatch = useDispatch()
  const requestStatus = useTaxonomyRequestStatus()

  useEffect(() => {
    dispatch(requestTaxonomy.request())
  }, [dispatch])

  return <>{children({ requestStatus })}</>
}

export default Taxonomy
