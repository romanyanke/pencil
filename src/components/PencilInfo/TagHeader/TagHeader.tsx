import React from 'react'
import { FormattedMessage } from 'react-intl'
import { appMessages } from '../../App/App.messages'
import { useFilter } from '../../Filter/Filter.hooks'
import { useCached } from '../../Pencil/Pancil.hooks'
import messages from './TagHeader.messages'

const TagHeader = () => {
  const [filter, setFilter] = useFilter()
  const cache = useCached()
  return (
    <button onClick={() => setFilter({ tag: '' })} className="TagHeader-drop">
      {cache ? (
        <FormattedMessage
          tagName="h3"
          {...messages.title}
          values={{
            tag: filter.tag,
            pencils: (
              <FormattedMessage {...appMessages.pencil} values={{ count: cache.pages.pencils }} />
            ),
          }}
        />
      ) : (
        'x'
      )}
    </button>
  )
}

export default TagHeader
