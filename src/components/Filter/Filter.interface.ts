export type FilterProps = FilterOwnProps

interface FilterOwnProps {
  queryStringFilter?: Filter
}

export interface Filter {
  page?: number
  display: string
  country: string
  tag: string
}

export type FilterAppStore = Filter
