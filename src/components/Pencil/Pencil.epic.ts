import { combineEpics } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, concatMap } from 'rxjs/operators'
import { pencilActions } from './Pencil.actions'
import { apiRequestPencilList, apiRequestSinglePencil } from './Pencil.api'
import { filterActions } from '../Filter/Filter.actions'
import { getEmptyFilter } from '../Filter/Filter.utils'

export const pencilEpic = combineEpics(
  action$ =>
    action$.pipe(
      filter(pencilActions.requestSingle.match),

      concatMap(({ payload }) =>
        from(apiRequestSinglePencil(payload)).pipe(
          map(pencilActions.single),
          catchError(() => of(filterActions.set(getEmptyFilter()))),
        ),
      ),
    ),

  action$ =>
    action$.pipe(
      filter(pencilActions.requestList.match),
      concatMap(({ payload }) =>
        from(apiRequestPencilList(payload)).pipe(
          map(pencilActions.list),
          catchError(() => of(filterActions.set(getEmptyFilter()))),
        ),
      ),
    ),
)
