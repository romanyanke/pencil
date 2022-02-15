import isEmpty from 'lodash/isEmpty'
import { useCallback } from 'react'
import { useFeed } from '../Feed/Feed.hooks'
import { FeedPencil } from '../Feed/Feed.interface'
import { useAppState } from '../State/State.hooks'
import { mapQueryToAppState } from '../State/State.utils'

export const usePencilSiblings = (): readonly [FeedPencil | undefined, FeedPencil | undefined] => {
  const { pencils } = useFeed()
  const {
    state: { display },
  } = useAppState()

  const index = pencils.findIndex(pencil => pencil.id === display)

  const prev = pencils[index - 1]
  const next = pencils[index + 1]

  return [prev, next] as const
}

export const usePseudoClick = () => {
  const { setState } = useAppState()
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
            setState(filterFromLink)
          }
        }
      }
    },
    [setState],
  )

  return handlePseudoLink
}
