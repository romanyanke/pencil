import { useRef, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { usePseudoClick } from './Info.hooks'
import { InfoProps } from './Info.interface'
import messages from './Info.messages'
import { mapFilterToQueryString } from '../../Filter/Filter.utils'

const Info = ({ pencil }: InfoProps) => {
  const handlePseudoLink = usePseudoClick()
  const { country, city } = pencil
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scroller.current) {
      scroller.current.scrollTo({ top: scroller.current.clientHeight })
    }
  }, [pencil.id])

  const scrollInfo = () => {
    if (scroller.current) {
      scroller.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="Info">
      <div className="Info-scroller" ref={scroller}>
        {pencil.country && (
          <button
            onClick={e => {
              e.stopPropagation()
              scrollInfo()
            }}
            className="Info-country"
          >
            {pencil.country.flag}
          </button>
        )}
        <div className="Info-frame Info-content" onClick={handlePseudoLink}>
          <h1>{pencil.title}</h1>

          <b>
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
          </b>

          <article dangerouslySetInnerHTML={{ __html: pencil.content }} className="Info-main" />

          <p>
            🏷
            {pencil.tags.map(tag => (
              <a className="Info-tag" key={tag} href={mapFilterToQueryString({ tag })}>
                {tag}
              </a>
            ))}
          </p>
        </div>

        {pencil.photos.map(src => (
          <div key={src} className="Info-frame">
            <img className="Info-photo" alt={pencil.title} src={src} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Info
