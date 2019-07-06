import React, { SFC, useCallback } from 'react'
import { useFilter } from '../../Filter/Filter.hooks'
import { getEmptyFilter } from '../../Filter/Filter.utils'
import { InfoProps } from './Info.interface'
import { getFilterFromLink } from './Info.utils'

const Info: SFC<InfoProps> = ({ pencil }) => {
  const [, setFilter] = useFilter()

  const handlePseudoLink = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const targetElement = e.target as HTMLElement

      if (targetElement.tagName === 'A') {
        e.stopPropagation()
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

      <p className="Info-tags">
        {pencil.tags.map((tag, index) => {
          return (
            <span key={`${index}/${tag}`}>
              #
              <a
                href={`?tag=${tag}`}
                onClick={e => {
                  e.preventDefault()
                  setFilter({ tag, display: '', country: '' })
                }}
              >
                {tag}
              </a>{' '}
            </span>
          )
        })}
      </p>
      <article
        className="Pencil-content"
        dangerouslySetInnerHTML={{ __html: pencil.content }}
        onClick={handlePseudoLink}
      />
      <p>
        {pencil.photos.map(src => {
          return <img className="Info-photo" alt={pencil.title} key={src} src={src} />
        })}
      </p>
    </div>
  )
}

export default Info
