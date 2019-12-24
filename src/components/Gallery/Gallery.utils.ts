import { PencilQuery } from '../Pencil/Pencil.interface'

export const requestFirstPage = (query: PencilQuery): PencilQuery => ({ ...query, page: 1 })

export const checkWindowScroll = () => {
  const preloadSensivity = document.body.clientHeight * 0.6
  const scrollBottomLine = window.pageYOffset + window.innerHeight

  return preloadSensivity < scrollBottomLine
}
