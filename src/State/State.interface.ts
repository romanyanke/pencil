import { useStateContextValue } from './State.hooks'
import { FeedFilter } from '../Feed/Feed.interface'

export interface AppState extends FeedFilter {
  display?: string
}

export type AppStateControls = ReturnType<typeof useStateContextValue>
export type AppStateActions =
  | { type: 'reset'; state: AppState }
  | { type: 'open:country'; geoId: string }
  | { type: 'open:tag'; tag: string }
  | { type: 'open:pencil'; pencilId: string }
  | { type: 'close:country' }
  | { type: 'close:tag' }
  | { type: 'close:pencil' }
