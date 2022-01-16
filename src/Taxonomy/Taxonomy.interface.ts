export interface TaxonomyApiResponse {
  countries: TaxonomyCountry[]
  tags: TaxonomyTag[]
  statistic: TaxonomyStatistic
}

interface TaxonomyTag {
  name: string
  pencils: number
}

export interface TaxonomyStatistic {
  countries: number
  items: number
  pencils: number
  tags: number
}
export interface TaxonomyCountry {
  flag: string
  geo: string
  name: string
  pencils: number
}
