import { useRef, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'
import classnames from 'classnames'
import { usePseudoClick } from './Pencil.hooks'
import classes from './Pencil.module.css'
import { PencilData } from '../../Feed/Feed.interface'
import { mapAppStateToQuery } from '../../State/State.utils'

export const Pencil = ({ data, onClose }: { data: PencilData; onClose(): void }) => {
  const { country, city, photos, title, content, tags } = data
  const handlePseudoLink = usePseudoClick()
  const scroller = useRef<HTMLDivElement | null>(null)
  const [highlighIndex, setHighlightedIndex] = useState(0)
  const getThumbClassName = (index: number) =>
    classnames(
      classes.thumb,
      index === highlighIndex && classes.highlight,
      photos.length === index && classes.info,
    )
  const getThumbId = (index: number) => `thumb-${index}`

  useEffect(() => {
    const el = scroller.current
    if (!el) {
      return
    }

    const onScroll = debounce(() => {
      requestAnimationFrame(() => {
        if (el) {
          setHighlightedIndex(Math.round(el.scrollTop / el.clientHeight))
        }
      })
    }, 16)

    el.addEventListener('scroll', onScroll)

    return () => {
      el.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const el = scroller.current
    if (!el) {
      return
    }

    const onHashChange = (e: HashChangeEvent) => {
      const id = e.newURL.split('#')?.[1] || getThumbId(0)
      const target = document.getElementById(id)

      if (target) {
        const top = target.offsetTop
        el.scrollTo({ top, behavior: 'smooth' })
      }
    }

    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  return (
    <div className={classes.info}>
      <div className={classes.thumbs} onClick={e => e.stopPropagation()}>
        {photos.map((src, index) => (
          <a
            className={getThumbClassName(index)}
            key={src}
            href={`#${getThumbId(index)}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        {country && (
          <a className={getThumbClassName(photos.length)} href="#info" title={country.name}>
            <span>{country.flag}</span>
          </a>
        )}
        <button className={classes.thumb} onClick={onClose}>
          <span>&#10006;</span>
        </button>
      </div>

      <div className={classes.scroller} ref={scroller}>
        {photos.map((src, index) => (
          <div key={src} className={classes.frame} id={getThumbId(index)}>
            <img className={classes.photo} alt={title} src={src} />
          </div>
        ))}

        <div
          className={classnames(classes.content, classes.frame)}
          id="info"
          onClick={handlePseudoLink}
        >
          <h1>{title}</h1>
          <h2>
            {city && country ? `${country.flag} ${country.name}, ${city}` : city ? city : null}
          </h2>
          <article className={classes.main} dangerouslySetInnerHTML={{ __html: content }} />

          <p>
            🏷
            {tags.map(tag => (
              <a className={classes.tag} key={tag} href={mapAppStateToQuery({ tag })}>
                {tag}
              </a>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}
