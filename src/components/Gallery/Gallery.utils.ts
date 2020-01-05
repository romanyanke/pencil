import { PencilQuery } from '../Pencil/Pencil.interface'

export const requestFirstPage = (query: PencilQuery): PencilQuery => ({ ...query, page: 1 })

export const checkFinishZone = (total: number, current: number) => {
  const sensivity = total * 0.6
  const thresholdReached = sensivity < current

  return thresholdReached
}

export const checkWindowScroll = () => {
  const scrollBottomLine = window.pageYOffset + window.innerHeight

  return checkFinishZone(document.body.clientHeight, scrollBottomLine)
}
