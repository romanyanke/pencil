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
      <h1>{pencil.title}</h1>
      <h2>
        {pencil.country.name}, {pencil.city}
      </h2>

      <article
        className="Pencil-content"
        dangerouslySetInnerHTML={{ __html: pencil.content }}
        onClick={handlePseudoLink}
      />
      <p>
        {pencil.photos.map(src => (
          <img key={src} className="Info-photo" alt={pencil.title} src={src} />
        ))}
      </p>

      <hr />
      <p className="Info-tags">
        {pencil.tags.map((tag, index) => {
          return (
            <span key={`${index}/${tag}`}>
              <a
                className="Info-tag"
                href={`?tag=${tag}`}
                onClick={e => {
                  e.preventDefault()
                  setFilter({ ...getEmptyFilter(), tag })
                }}
              >
                #{tag}
              </a>{' '}
            </span>
          )
        })}
      </p>
    </div>
  )
}

export default Info
