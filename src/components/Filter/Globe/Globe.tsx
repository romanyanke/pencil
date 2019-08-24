import React, { FC, useEffect, useState } from 'react'
import { GlobeProps } from './Globe.interface'

const Globe: FC<GlobeProps> = ({ animated }) => {
  const isAnimated = Boolean(animated)
  const frames = ['🌍', '🌏', '🌎']
  const speed = 400
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (isAnimated) {
      const spin = setTimeout(() => {
        const nextIndex = index + 1 === frames.length ? 0 : index + 1
        setIndex(nextIndex)
      }, speed)
      return () => {
        clearTimeout(spin)
      }
    }
  }, [isAnimated, speed, index, setIndex, frames])

  return <>{frames[index]}</>
}

export default Globe