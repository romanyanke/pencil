import { ActionsObservable, combineEpics, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { ActionType, getType } from 'typesafe-actions'
import { requestTaxonomy } from './Taxonomy.actions'
import { apiRequestTaxonomy } from './Taxonomy.api'

export default combineEpics(
  (action$: ActionsObservable<ActionType<typeof requestTaxonomy.request>>) =>
    action$.pipe(
      ofType(getType(requestTaxonomy.request)),
      mergeMap(() =>
        from(apiRequestTaxonomy()).pipe(
          map(requestTaxonomy.success),
          catchError(() => of(requestTaxonomy.failure())),
        ),
      ),
    ),
)
