import { FormattedMessage } from 'react-intl'
import { useEffect, useRef, useState } from 'react'
import debounce from 'lodash/debounce'
import classNames from 'classnames'
import { usePseudoClick } from './Info.hooks'
import { InfoProps } from './Info.interface'
import messages from './Info.messages'
import { mapFilterToQueryString } from '../../Filter/Filter.utils'

const Info = ({ pencil }: InfoProps) => {
  const handlePseudoLink = usePseudoClick()
  const { country, city, photos } = pencil
  const scroller = useRef<HTMLDivElement | null>(null)
  const [highlighIndex, setHiglightedIndex] = useState(0)

  const getThumbClassName = (index: number) =>
    classNames('Info-thumb', {
      'Info-thumb-highlight': index === highlighIndex,
      'Info-thumb-info': photos.length === index,
    })

  useEffect(() => {
    const el = scroller.current
    if (el) {
      const onScrollChange = debounce(() => {
        requestAnimationFrame(() => {
          if (el) {
            setHiglightedIndex(Math.round(el.scrollTop / el.clientHeight))
          }
        })
      }, 16)

      el.addEventListener('scroll', onScrollChange)

      return () => {
        el.removeEventListener('scroll', onScrollChange)
      }
    }
  }, [])

  return (
    <div className="Info">
      <div className="Info-thumbs" onClick={e => e.stopPropagation()}>
        {photos.map((src, index) => {
          const idAttr = `#thumb${index}`

          return (
            <a
              className={getThumbClassName(index)}
              key={src}
              href={idAttr}
              style={{ backgroundImage: `url(${src})` }}
            />
          )
        })}
        {pencil.country && (
          <a className={getThumbClassName(photos.length)} href="#info" title={pencil.country.name}>
            <span>{pencil.country.flag}</span>
          </a>
        )}
      </div>

      <div className="Info-scroller" ref={scroller}>
        {pencil.photos.map((src, index) => (
          <div key={src} className="Info-frame" id={`thumb${index}`}>
            <img className="Info-photo" alt={pencil.title} src={src} />
          </div>
        ))}

        <div className="Info-frame Info-content" id="info" onClick={handlePseudoLink}>
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
      </div>
    </div>
  )
}

export default Info
