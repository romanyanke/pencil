import { useCallback } from 'react'
import { useFilter } from '../../Filter/Filter.hooks'
import { getEmptyFilter } from '../../Filter/Filter.utils'
import { getFilterFromLink } from './Info.utils'

export const usePseudoClick = () => {
  const [, setFilter] = useFilter()
  const handlePseudoLink = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.stopPropagation()
      const targetElement = e.target as HTMLElement
      if (targetElement.tagName === 'A') {
        const link = targetElement.getAttribute('href')
        if (link) {
          const filterFromLink = getFilterFromLink(link)
          if (filterFromLink) {
            e.preventDefault()
            setFilter({ ...getEmptyFilter(), ...filterFromLink })
          }
        }
      }
    },
    [setFilter],
  )

  return handlePseudoLink
}
