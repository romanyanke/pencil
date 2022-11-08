import { createContext, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { TaxonomyApiResponse } from './Taxonomy.interface'
import { useTaxonomyQuery } from '../api'
import Loader from '../Theme/Loader'

export const TaxonomyContext = createContext<TaxonomyApiResponse>(null as any)

export const Taxonomy = ({ children }: PropsWithChildren) => {
  const { i18n } = useTranslation()
  const { data, isError } = useTaxonomyQuery({ language: i18n.language })

  if (data) {
    return <TaxonomyContext.Provider value={data}>{children}</TaxonomyContext.Provider>
  }

  return <Loader isError={isError} />
}
