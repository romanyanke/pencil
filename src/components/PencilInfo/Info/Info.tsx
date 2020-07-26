import React from 'react'
import { FormattedMessage } from 'react-intl'
import { usePseudoClick } from './Info.hooks'
import { InfoProps } from './Info.interface'
import messages from './Info.messages'
import { mapFilterToQueryString } from '../../Filter/Filter.utils'

const Info = ({ pencil }: InfoProps) => {
  const handlePseudoLink = usePseudoClick()
  const { country, city } = pencil

  return (
    <div className="Info">
      <div className="Info-content" onClick={handlePseudoLink}>
        <h1>{pencil.title}</h1>

        <h2>
          {city && country ? (
            <FormattedMessage
              {...messages.location}
              values={{
                flag: country.flag,
                country: country.name,
                city: pencil.city,
              }}
            />
          ) : city ? (
            city
          ) : (
            <FormattedMessage {...messages.unknown} />
          )}
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
        <article className="Info-tags">
          🏷
          {pencil.tags.map(tag => (
            <a className="Info-tag" key={tag} href={mapFilterToQueryString({ tag })}>
              {tag}
            </a>
          ))}
        </article>
      </div>
    </div>
  )
}

export default Info
