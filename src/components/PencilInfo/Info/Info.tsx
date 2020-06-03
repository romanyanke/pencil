import React from 'react'
import { FormattedMessage } from 'react-intl'
import { usePseudoClick } from './Info.hooks'
import { InfoProps } from './Info.interface'
import messages from './Info.messages'
import { displayPencilLocation, getTagHref } from './Info.utils'
import { usePencilFlag } from '../../Taxonomy/Taxonomy.hooks'
import { useFilter } from '../../Filter/Filter.hooks'

const Info = ({ pencil }: InfoProps) => {
  const flag = usePencilFlag(pencil)
  const handlePseudoLink = usePseudoClick()
  const location = displayPencilLocation(pencil)
  const [, { setTag }] = useFilter()

  return (
    <div className="Info">
      <div className="Info-content" onClick={handlePseudoLink}>
        <h1>{pencil.title}</h1>

        <h2>
          {flag} {location}
        </h2>

        <article dangerouslySetInnerHTML={{ __html: pencil.content }} />

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

      <div className="Info-content" onClick={handlePseudoLink}>
        🏷
        {pencil.tags.map(tag => (
          <a className="Info-tag" key={tag} href={getTagHref(tag)}>
            {tag}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Info
