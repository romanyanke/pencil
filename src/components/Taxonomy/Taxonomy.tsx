import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './Taxonomy.messages'
import Loader from '../Loader'
import { useTaxonomyRequest } from '../Taxonomy/Taxonomy.hooks'

const Taxonomy: FC = ({ children }) => {
  const { pending, failure } = useTaxonomyRequest()

  return (
    <>
      {pending || failure ? (
        <div className="Taxonomy-loading">
          {pending && <Loader />}
          {failure && (
            <button onClick={() => window.location.reload()}>
              <FormattedMessage {...messages.error} />
            </button>
          )}
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default Taxonomy
