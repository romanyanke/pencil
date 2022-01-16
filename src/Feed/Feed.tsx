import { createContext, FC } from 'react'
import { useFeedContextValue } from './Feed.hooks'

export const FeedContext = createContext<ReturnType<typeof useFeedContextValue>>(null as any)

const Feed: FC = ({ children }) => {
  const value = useFeedContextValue()

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>
}

export default Feed
