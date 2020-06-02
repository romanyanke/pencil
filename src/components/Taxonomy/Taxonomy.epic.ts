import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, map, mergeMap, filter } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { taxonomyActions, TaxonomyActions } from './Taxonomy.actions'
import { apiRequestTaxonomy } from './Taxonomy.api'

const taxonomyEpic: Epic<TaxonomyActions> = action$ =>
  action$.pipe(
    filter(isActionOf(taxonomyActions.requestTaxonomy.request)),
    mergeMap(() =>
      from(apiRequestTaxonomy()).pipe(
        map(taxonomyActions.requestTaxonomy.success),
        catchError(() => of(taxonomyActions.requestTaxonomy.failure())),
      ),
    ),
  )

export default taxonomyEpic
