import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { useFilter } from '../../Filter/Filter.hooks'
import { getEmptyFilter } from '../../Filter/Filter.utils'
import { usePencilFlag } from '../../Taxonomy/Taxonomy.hooks'
import { InfoProps } from './Info.interface'
import messages from './Info.messages'
import { getFilterFromLink } from './Info.utils'

const Info = ({ pencil }: InfoProps) => {
  const [, setFilter] = useFilter()
  const flag = usePencilFlag(pencil)
  const location = [pencil.country.name, pencil.city].filter(Boolean).join(', ')
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
          {flag} {location}
        </h2>

        <article dangerouslySetInnerHTML={{ __html: pencil.content }} onClick={handlePseudoLink} />

        <p>
          <FormattedMessage
            tagName="b"
            {...messages.photo}
            values={{ count: pencil.photos.length }}
          />
        </p>
      </div>

      {pencil.photos.map(src => (
        <div key={src} className="Info-frame">
          <img className="Info-photo" alt={pencil.title} src={src} />
        </div>
      ))}
    </div>
  )
}

export default Info
