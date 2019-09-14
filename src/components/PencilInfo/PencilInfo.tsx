import React, { useEffect } from 'react'
import { useFilter } from '../Filter/Filter.hooks'
import Pencil from '../Pencil'
import Info from './Info'

const PencilInfo = () => {
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
      {({ pencil }) =>
        pencil ? (
          <div className="PencilInfo-backdrop" onClick={closePencilInfo}>
            <div className="PencilInfo-content">
              <Info pencil={pencil} />
            </div>
          </div>
        ) : null}
    </Pencil>
  ) : null
}

export default PencilInfo
