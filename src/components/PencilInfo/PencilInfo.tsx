import React, { SFC } from 'react'
import { useFilter } from '../Filter/Filter.hooks'
import Pencil from '../Pencil'
import Info from './Info'
import { PencilInfoProps } from './PencilInfo.interface'

const PencilInfo: SFC<PencilInfoProps> = () => {
  const [filter, setFilter] = useFilter()
  const closePencilInfo = () => setFilter({ display: '' })
  if (filter.display) {
    return (
      <Pencil id={filter.display}>
        {({ pencil }) => {
          if (pencil) {
            return (
              <div className="PencilInfo-backdrop" onClick={closePencilInfo}>
                <Info pencil={pencil} />
              </div>
            )
          }
          return null
        }}
      </Pencil>
    )
  }
  return null
}

export default PencilInfo
