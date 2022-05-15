import isEmpty from 'lodash/isEmpty'
import { useCallback } from 'react'
import { useAppState } from '../State/State.hooks'
import { mapQueryToAppState } from '../State/State.utils'

export const usePseudoClick = () => {
  const { resetFilter } = useAppState()
  const handlePseudoLink = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.stopPropagation()
      const targetElement = e.target as HTMLElement
      if (targetElement.tagName === 'A') {
        const link = targetElement.getAttribute('href')
        if (link) {
          const filterFromLink = mapQueryToAppState(link)
          if (!isEmpty(filterFromLink)) {
            e.preventDefault()
            resetFilter(filterFromLink)
          }
        }
      }
    },
    [resetFilter],
  )

  return handlePseudoLink
}
