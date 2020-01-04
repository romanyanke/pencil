import { Epic, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { getType } from 'typesafe-actions'
import { taxonomyActions, TaxonomyActions } from './Taxonomy.actions'
import { apiRequestTaxonomy } from './Taxonomy.api'

const taxonomyEpic: Epic<TaxonomyActions> = action$ =>
  action$.pipe(
    ofType(getType(taxonomyActions.requestTaxonomy.request)),
    mergeMap(() =>
      from(apiRequestTaxonomy()).pipe(
        map(taxonomyActions.requestTaxonomy.success),
        catchError(() => of(taxonomyActions.requestTaxonomy.failure())),
      ),
    ),
  )

export default taxonomyEpic
