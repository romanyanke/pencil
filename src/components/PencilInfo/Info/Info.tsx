import React, { SFC, useCallback } from 'react'
import { useFilter } from '../../Filter/Filter.hooks'
import { getEmptyFilter } from '../../Filter/Filter.utils'
import { InfoProps } from './Info.interface'
import { getFilterFromLink } from './Info.utils'

const Info: SFC<InfoProps> = ({ pencil }) => {
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

  return (
    <div className="Info">
      <div className="Info-content">
        <h1>{pencil.title}</h1>
        <h2>
          {pencil.country.name}, {pencil.city}
        </h2>

        <article dangerouslySetInnerHTML={{ __html: pencil.content }} onClick={handlePseudoLink} />
      </div>
      <p>
        {pencil.photos.map(src => (
          <img key={src} className="Info-photo" alt={pencil.title} src={src} />
        ))}
      </p>
    </div>
  )
}

export default Info
