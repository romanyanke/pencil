import classNames from 'classnames'
import React from 'react'
import { useSiblings } from '../../Filter/Filter.hooks'
import Sibling from './Sibling'
import { SiblingsProps } from './Siblings.interface'

const Siblings = ({ pencilId }: SiblingsProps) => {
  const siblings = useSiblings(pencilId)

  return (
    <div className="Siblings">
      {siblings.map((pencil, index) => {
        const key = pencil?.id ?? index

        return (
          <div key={key} className={classNames('Siblings-sibling', pencil && 'Siblings-active')}>
            {pencil && <Sibling pencil={pencil} />}
          </div>
        )
      })}
    </div>
  )
}

export default Siblings
