import { useStateContextValue } from './State.hooks'
import { FeedFilter } from '../Feed/Feed.interface'
import { Language } from '../LanguageProvider/LanguageProvider.interface'

export interface AppState extends FeedFilter {
  language?: Language
  display?: string
}

export type AppStateControls = ReturnType<typeof useStateContextValue>
export type AppStateActions =
  | { type: 'reset'; state: AppState }
  | { type: 'open:country'; geoId: string }
  | { type: 'open:tag'; tag: string }
  | { type: 'open:pencil'; pencilId: string }
  | { type: 'language'; language: Language }
  | { type: 'close:country' }
  | { type: 'close:tag' }
  | { type: 'close:pencil' }
