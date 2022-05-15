import { PropsWithChildren } from 'react'
import { StateContext, useStateContextValue, useStateInUrl } from './State.hooks'

const State = ({ children }: PropsWithChildren<{}>) => {
  const value = useStateContextValue()

  useStateInUrl(value)

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>
}

export default State
