import { uniqBy } from 'lodash'
import { ActionsObservable, combineEpics, ofType, StateObservable } from 'redux-observable'
import { from, of } from 'rxjs'
import { bufferTime, catchError, filter, map, mergeAll, mergeMap } from 'rxjs/operators'
import { ActionType, getType, isActionOf } from 'typesafe-actions'
import { AppStore } from './../../store'
import { requestPencilList, requestSinglePencil } from './Pencil.actions'
import { apiRequestPencilList, apiRequestSinglePencil } from './Pencil.api'
import { getPencilsFromCacheByQuery, mapRequestToCacheId } from './Pencil.utils'

export default combineEpics(
  (
    action$: ActionsObservable<
      ActionType<typeof requestSinglePencil.request | typeof requestPencilList.request>
    >,
    store$: StateObservable<AppStore>,
  ) =>
    action$.pipe(
      ofType(getType(requestSinglePencil.request), getType(requestPencilList.request)),
      bufferTime(33),
      filter(actions => actions.length > 0),
      mergeMap(actions =>
        from(
          uniqBy(actions, ({ payload }) => mapRequestToCacheId(payload)).map(action => {
            if (isActionOf(requestSinglePencil.request)(action)) {
              const cachedValue = store$.value.pencils.normalized[action.payload.id]
              return cachedValue
                ? of(requestSinglePencil.success(cachedValue))
                : from(apiRequestSinglePencil(action.payload)).pipe(
                    map(requestSinglePencil.success),
                    catchError(() => of(requestSinglePencil.failure())),
                  )
            } else if (isActionOf(requestPencilList.request)(action)) {
              const cacheId = mapRequestToCacheId(action.payload)
              const cacheItem = store$.value.pencils.cache[mapRequestToCacheId(action.payload)]
              const { cache, normalized } = store$.value.pencils
              const data = getPencilsFromCacheByQuery(action.payload.query, cache, normalized)

              return cacheItem
                ? of(
                    requestPencilList.success({
                      cacheId,
                      pages: cacheItem.pages,
                      data,
                    }),
                  )
                : from(apiRequestPencilList(action.payload)).pipe(
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
