export type FilterProps = FilterOwnProps

export interface FilterOwnProps {
  queryStringFilter?: Filter
}

export interface Filter {
  page?: number
  display: string
  country: string
  tag: string
}

export type FilterAppStore = Filter
