import { combineEpics } from 'redux-observable'
import { pencilEpic } from './components/Pencil'
import { taxonomyEpic } from './components/Taxonomy'

const rootEpic = combineEpics(taxonomyEpic, pencilEpic)

export default rootEpic
