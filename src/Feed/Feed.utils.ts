import compact from 'lodash/compact'
import { FeedApiPayload } from './Feed.interface'

export const mapPayloadToPath = (
  { page = 1, tag, country, locale }: FeedApiPayload = { locale: 'ru' },
) => {
  const paths = [
    locale === 'en' && `/${locale}/`,
    tag && `/tags/${tag}/`,
    country && `/geo/${country}/`,
    page > 1 && `/page/${page}/`,
  ]

  if (tag && country) {
    throw new Error('Using `tag` and `country` at the same time is prohibited')
  }

  return (
    `${compact(paths).join('')}`.replace(/\s/g, '-').replace(/\/\//g, '/').toLocaleLowerCase() ||
    '/'
  )
}
