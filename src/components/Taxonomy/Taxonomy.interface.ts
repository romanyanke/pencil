import { ReactNode } from 'react'
import { RequestStatus } from '../../modules/requestStatus'
import { PencilCountry } from '../Pencil/Pencil.interface'

export type TaxonomyProps = TaxonomyOwnProps

interface TaxonomyOwnProps {
  children(injectedProps: TaxonomyInjectedProps): ReactNode
}

interface TaxonomyInjectedProps {
  requestStatus: RequestStatus
}

export interface TaxonomyResponse {
  meta: {
    tags: number
    countries: number
    items: number
    pencils: number
  }
  taxonomy: {
    tags: string[]
    countries: PencilCountry[]
  }
}

export interface TaxonomyAppStore {
  requestStatus: RequestStatus
  pencilCount: number
  countries: PencilCountry[]
  tags: string[]
}
