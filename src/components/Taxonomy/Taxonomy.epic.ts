import { combineEpics } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, map, switchMap, filter } from 'rxjs/operators'
import { taxonomyActions } from './Taxonomy.actions'
import { apiRequestTaxonomy } from './Taxonomy.api'

export const taxonomyEpic = combineEpics(action$ =>
  action$.pipe(
    filter(taxonomyActions.request.match),
    switchMap(() =>
      from(apiRequestTaxonomy()).pipe(
        map(taxonomyActions.success),
        catchError(() => of(taxonomyActions.failure())),
      ),
    ),
  ),
)
