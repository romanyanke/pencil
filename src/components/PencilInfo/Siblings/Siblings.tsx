import classNames from 'classnames'
import React from 'react'
import { useFilter, useSiblings } from '../../Filter/Filter.hooks'
import { mapFilterToQueryString } from '../../Filter/Filter.utils'
import { SiblingsProps } from './Siblings.interface'

const Siblings = ({ pencilId }: SiblingsProps) => {
  const siblings = useSiblings(pencilId)
  const [, setFilter] = useFilter()

  return (
    <div className="Siblings">
      {siblings.map((pencil, index) => (
        <div
          key={pencil?.id ?? index}
          className={classNames('Siblings-sibling', pencil && 'Siblings-active')}
        >
          {pencil && (
            <a
              href={mapFilterToQueryString({ display: pencil.id })}
              onClick={e => {
                e.preventDefault()
                setFilter({ display: pencil.id })
              }}
            >
              <img src={pencil.preview} alt={pencil.title} />
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

export default Siblings
