import { useEffect, useState } from 'react'

export interface GlobeProps {
  animated?: boolean
}

const Globe = ({ animated = false }: GlobeProps) => {
  const [frames] = useState(['🌍', '🌏', '🌎'])
  const speed = 400
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (animated) {
      const spin = setTimeout(() => {
        const nextIndex = index + 1 === frames.length ? 0 : index + 1
        setIndex(nextIndex)
      }, speed)

      return () => {
        clearTimeout(spin)
      }
    }
  }, [animated, speed, index, setIndex, frames])

  return <>{frames[index]}</>
}

export default Globe
