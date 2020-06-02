import { Epic, combineEpics } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, concatMap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { PencilActions, pencilActions } from './Pencil.actions'
import { apiRequestPencilList, apiRequestSinglePencil } from './Pencil.api'

const pencilEpic: Epic<PencilActions> = combineEpics(
  action$ =>
    action$.pipe(
      filter(isActionOf(pencilActions.requestSinglePencil.request)),
      concatMap(({ payload }) =>
        from(apiRequestSinglePencil(payload)).pipe(
          map(pencilActions.requestSinglePencil.success),
          catchError(() => of(pencilActions.requestSinglePencil.failure())),
        ),
      ),
    ),

  action$ =>
    action$.pipe(
      filter(isActionOf(pencilActions.requestPencilList.request)),
      concatMap(({ payload }) =>
        from(apiRequestPencilList(payload)).pipe(
          map(pencilActions.requestPencilList.success),
          catchError(() => of(pencilActions.requestPencilList.failure())),
        ),
      ),
    ),
)
export default pencilEpic
