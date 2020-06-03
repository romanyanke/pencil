import React, { useEffect, useRef } from 'react'
import Info from './Info'
import { useFilter } from '../Filter/Filter.hooks'
import { usePencil } from '../Pencil/Pencil.hooks'

const PencilInfo = () => {
  const [{ display }, { updateFilter }] = useFilter()
  const scroller = useRef<HTMLDivElement>(null)
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
    <div
      className="PencilInfo-backdrop"
      onClick={() => updateFilter({ display: '' })}
      ref={scroller}
    >
      <div className="PencilInfo-content">
        <Info pencil={pencil} />
      </div>
    </div>
  ) : null
}

export default PencilInfo
