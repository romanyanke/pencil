import React from 'react'
import { mapFilterToQueryString } from '../../../Filter/Filter.utils'
import { SiblingProps } from './Sibling.interface'

const Sibling = ({ pencil }: SiblingProps) => (
  <a className="Sibling" href={mapFilterToQueryString({ display: pencil.id })}>
    <img src={pencil.preview} alt={pencil.title} />
  </a>
)

export default Sibling
