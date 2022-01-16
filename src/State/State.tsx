import { FC } from 'react'
import { StateContext, useStateContextValue } from './State.hooks'

const State: FC = ({ children }) => {
  const value = useStateContextValue()

  return <StateContext.Provider value={value}> {children}</StateContext.Provider>
}

export default State
