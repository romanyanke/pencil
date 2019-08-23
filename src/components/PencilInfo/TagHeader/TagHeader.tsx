import React, { useCallback, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { appMessages } from '../../App/App.messages'
import { useFilter } from '../../Filter/Filter.hooks'
import { useCached, usePecnilRequestStatus } from '../../Pencil/Pencil.hooks'
import messages from './TagHeader.messages'

const TagHeader = () => {
  const [filter, setFilter] = useFilter()
  const cache = useCached()
  const requestStatus = usePecnilRequestStatus()
  const dropTag = useCallback(() => setFilter({ tag: '' }), [setFilter])

  useEffect(() => {
    if (requestStatus.rejected) {
      dropTag()
    }
  }, [dropTag, requestStatus])

  return (
    <button onClick={dropTag} className="TagHeader-drop">
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
      ) : null}
    </button>
  )
}

export default TagHeader
