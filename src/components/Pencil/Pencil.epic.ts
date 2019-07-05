import { uniqBy } from 'lodash'
import { ActionsObservable, combineEpics, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { bufferTime, catchError, filter, map, mergeAll, mergeMap } from 'rxjs/operators'
import { ActionType, getType, isActionOf } from 'typesafe-actions'
import { requestPencilList, requestSinglePencil } from './Pencil.actions'
import { apiRequestPencilList, apiRequestSinglePencil } from './Pencil.api'
import { mapRequestToCacheId } from './Pencil.utils'

export default combineEpics(
  (
    action$: ActionsObservable<
      ActionType<typeof requestSinglePencil.request | typeof requestPencilList.request>
    >,
  ) =>
    action$.pipe(
      ofType(getType(requestSinglePencil.request), getType(requestPencilList.request)),
      bufferTime(33),
      filter(actions => actions.length > 0),
      mergeMap(actions =>
        from(
          uniqBy(actions, ({ payload }) => mapRequestToCacheId(payload)).map(action => {
            if (isActionOf(requestSinglePencil.request)(action)) {
              return from(apiRequestSinglePencil(action.payload)).pipe(
                map(requestSinglePencil.success),
                catchError(() => of(requestSinglePencil.failure())),
              )
            } else if (isActionOf(requestPencilList.request)(action)) {
              return from(apiRequestPencilList(action.payload)).pipe(
                map(requestPencilList.success),
                catchError(() => of(requestPencilList.failure())),
              )
            }
            throw new Error()
          }),
        ).pipe(mergeAll()),
      ),
    ),
)
