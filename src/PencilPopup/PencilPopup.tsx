import { useRef, useEffect } from 'react'
import classes from './PencilPopup.module.css'
import { Pencil } from './Pencil/Pencil'
import { usePencil } from '../api'
import { useAppState } from '../State/State.hooks'

export const PencilPopup = () => {
  const {
    state: { display },
  } = useAppState()
  const { data: pencil } = usePencil(display!)
  const { closePencil } = useAppState()

  const scroller = useRef<HTMLDivElement>(null)
  const showPopup = display && display === pencil?.id

  const closeWithAnimation = () => {
    scroller.current?.classList?.add(classes.close)
    setTimeout(() => {
      closePencil()
    }, 180)
  }

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden'

      if (scroller.current) {
        scroller.current.scrollTop = 0
      }
    } else {
      document.body.style.overflow = 'initial'
    }
  }, [showPopup])

  return showPopup ? (
    <div className={classes.backdrop} onClick={closeWithAnimation} ref={scroller}>
      <div className={classes.modal}>
        <Pencil data={pencil} onClose={closeWithAnimation} />
      </div>
    </div>
  ) : null
}
