import { combineEpics } from 'redux-observable'
import { taxonomyEpic } from './components/Taxonomy/Taxonomy.epic'
import { pencilEpic } from './components/Pencil/Pencil.epic'

export const rootEpic = combineEpics(taxonomyEpic, pencilEpic)
