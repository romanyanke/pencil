import React, { SFC, useEffect } from 'react'
import { useFilter } from '../Filter/Filter.hooks'
import Pencil from '../Pencil'
import Info from './Info'
import { PencilInfoProps } from './PencilInfo.interface'

const PencilInfo: SFC<PencilInfoProps> = () => {
  const [filter, setFilter] = useFilter()
  const { display } = filter
  const closePencilInfo = () => setFilter({ display: '' })

  useEffect(() => {
    if (display === '') {
      document.body.classList.remove('no-scroll')
    } else {
      document.body.classList.add('no-scroll')
    }
  }, [display])

  return display ? (
    <Pencil id={display}>
      {({ pencil }) => {
        return pencil ? (
          <div className="PencilInfo-backdrop" onClick={closePencilInfo}>
            <div className="PencilInfo-content">
              <Info pencil={pencil} />
            </div>
          </div>
        ) : null
      }}
    </Pencil>
  ) : null
}

export default PencilInfo
