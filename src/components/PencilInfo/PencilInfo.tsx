import classNames from 'classnames'
import React, { useEffect } from 'react'
import { useFilter, useSiblings } from '../Filter/Filter.hooks'
import { usePencil } from '../Pencil/Pencil.hooks'
import Info from './Info'

const PencilInfo = () => {
  const [{ display }, setFilter] = useFilter()
  const [prevPencil, nextPencil] = useSiblings(display)
  console.log(prevPencil, nextPencil)

  const closePencilInfo = () => setFilter({ display: '' })
  const { pencil } = usePencil({ id: display })

  useEffect(() => {
    if (display === '') {
      document.body.style.overflow = 'initial'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }, [display])

  return pencil ? (
    <div className="PencilInfo-backdrop" onClick={closePencilInfo}>
      <div className="PencilInfo-content">
        <Info pencil={pencil} />
      </div>
    </div>
  ) : null
}

export default PencilInfo
