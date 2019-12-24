import React, { useEffect, useRef } from 'react'
import { useFilter } from '../Filter/Filter.hooks'
import { usePencil } from '../Pencil/Pencil.hooks'
import Info from './Info'

const PencilInfo = () => {
  const [{ display }, setFilter] = useFilter()
  const scroller = useRef<HTMLDivElement>(null)
  const closePencilInfo = () => setFilter({ display: '' })
  const { pencil } = usePencil({ id: display })

  useEffect(() => {
    if (display === '') {
      document.body.style.overflow = 'initial'
    } else {
      document.body.style.overflow = 'hidden'

      if (scroller.current) {
        scroller.current.scrollTop = 0
      }
    }
  }, [display, scroller])

  return pencil ? (
    <div className="PencilInfo-backdrop" onClick={closePencilInfo} ref={scroller}>
      <div className="PencilInfo-content">
        <Info pencil={pencil} />
      </div>
    </div>
  ) : null
}

export default PencilInfo
