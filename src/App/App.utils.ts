const plural = new Intl.PluralRules('ru-RU')

const variant = {
  pencil: new Map([
    ['one', 'карандаш'],
    ['few', 'карандаша'],
    ['many', 'карандашей'],
  ]),
  country: new Map([
    ['one', 'страна'],
    ['few', 'страны'],
    ['many', 'стран'],
  ]),
}

const format = (count: number, form?: string) => [count, form].join(' ')

export const formatPlural = {
  pencil: (count: number) => format(count, variant.pencil.get(plural.select(count))),
  country: (count: number) => format(count, variant.country.get(plural.select(count))),
}
