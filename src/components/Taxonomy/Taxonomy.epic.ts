import { ActionsObservable, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { ActionType, getType } from 'typesafe-actions'
import { taxonomyActions } from './Taxonomy.actions'
import { apiRequestTaxonomy } from './Taxonomy.api'

export default (
  action$: ActionsObservable<ActionType<typeof taxonomyActions.requestTaxonomy.request>>,
) =>
  action$.pipe(
    ofType(getType(taxonomyActions.requestTaxonomy.request)),
    mergeMap(() =>
      from(apiRequestTaxonomy()).pipe(
        map(taxonomyActions.requestTaxonomy.success),
        catchError(() => of(taxonomyActions.requestTaxonomy.failure())),
      ),
    ),
  )
