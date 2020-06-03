import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './TagHeader.messages'
import { appMessages } from '../../App/App.messages'
import { useFilter } from '../../Filter/Filter.hooks'
import { usePencilCache } from '../../Pencil/Pencil.hooks'

const TagHeader = () => {
  const [{ tag }, { updateFilter }] = useFilter()
  const cache = usePencilCache()

  if (tag && cache) {
    const pencilCount = cache.pages.pencils
    const countryCount = cache.geoIds.length

    return (
      <button onClick={() => updateFilter({ tag: '' })} className="TagHeader-drop">
        <FormattedMessage
          {...messages.title}
          values={{
            tag,
            pencilCount: (
              <FormattedMessage {...appMessages.pencil} values={{ count: pencilCount }} />
            ),
            countryCount: (
              <FormattedMessage {...appMessages.country} values={{ count: countryCount }} />
            ),
          }}
        />
      </button>
    )
  }

  return null
}

export default TagHeader
