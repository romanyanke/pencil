import { uniqBy } from 'lodash'
import { Epic, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { bufferTime, catchError, filter, map, mergeAll, mergeMap } from 'rxjs/operators'
import { ActionType, getType, isActionOf } from 'typesafe-actions'
import { PencilActions, pencilActions } from './Pencil.actions'
import { apiRequestPencilList, apiRequestSinglePencil } from './Pencil.api'
import { mapRequestToCacheId } from './Pencil.utils'

type PencilRequestActions = ActionType<
  typeof pencilActions.requestSinglePencil.request | typeof pencilActions.requestPencilList.request
>

const pencilEpic: Epic<PencilActions> = action$ =>
  action$.pipe(
    ofType<PencilActions, PencilRequestActions>(
      getType(pencilActions.requestSinglePencil.request),
      getType(pencilActions.requestPencilList.request),
    ),
    bufferTime(66),
    filter(actions => actions.length > 0),
    mergeMap(actions =>
      from(
        uniqBy(actions, ({ payload }) => mapRequestToCacheId(payload)).map(action => {
          if (isActionOf(pencilActions.requestSinglePencil.request)(action)) {
            return from(apiRequestSinglePencil(action.payload)).pipe(
              map(pencilActions.requestSinglePencil.success),
              catchError(() => of(pencilActions.requestSinglePencil.failure())),
            )
          } else if (isActionOf(pencilActions.requestPencilList.request)(action)) {
            return from(apiRequestPencilList(action.payload)).pipe(
              map(pencilActions.requestPencilList.success),
              catchError(() => of(pencilActions.requestPencilList.failure())),
            )
          }
          throw new Error()
        }),
      ).pipe(mergeAll()),
    ),
  )

export default pencilEpic
