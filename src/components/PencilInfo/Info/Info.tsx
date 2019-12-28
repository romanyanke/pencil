import React from 'react'
import { FormattedMessage } from 'react-intl'
import { usePencilFlag } from '../../Taxonomy/Taxonomy.hooks'
import { usePseudoClick } from './Info.hooks'
import { InfoProps } from './Info.interface'
import messages from './Info.messages'

const Info = ({ pencil }: InfoProps) => {
  const flag = usePencilFlag(pencil)
  const handlePseudoLink = usePseudoClick()
  const location = [pencil.country.name, pencil.city].filter(Boolean).join(', ')

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
    </div>
  )
}

export default Info
