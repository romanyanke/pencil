import { PropsWithChildren } from 'react'
import { StateContext, useStateContextValue } from './State.hooks'

const State = ({ children }: PropsWithChildren<{}>) => {
  const value = useStateContextValue()

  return <StateContext.Provider value={value}> {children}</StateContext.Provider>
}

export default State
