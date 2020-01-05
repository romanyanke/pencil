import React, { useCallback, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { appMessages } from '../../App/App.messages'
import { useFilter } from '../../Filter/Filter.hooks'
import { useCached, usePecnilRequestStatus } from '../../Pencil/Pencil.hooks'
import { useCountryFlags } from '../../Taxonomy/Taxonomy.hooks'
import messages from './TagHeader.messages'

const TagHeader = () => {
  const [{ tag }, setFilter] = useFilter()
  const cache = useCached()
  const requestStatus = usePecnilRequestStatus()
  const dropTag = useCallback(() => setFilter({ tag: '' }), [setFilter])
  const countryFlags = useCountryFlags(cache?.geoIds ?? [])
  const pencilCount = cache?.pages.pencils
  const countryCount = cache?.geoIds.length

  useEffect(() => {
    if (requestStatus.rejected) {
      dropTag()
    }
  }, [dropTag, requestStatus])

  return tag && pencilCount && countryCount ? (
    <button onClick={dropTag} className="TagHeader-drop" title={countryFlags.join(' ')}>
      <FormattedMessage
        {...messages.title}
        values={{
          tag,
          pencilCount: <FormattedMessage {...appMessages.pencil} values={{ count: pencilCount }} />,
          countryCount: (
            <FormattedMessage {...appMessages.country} values={{ count: countryCount }} />
          ),
        }}
      />
    </button>
  ) : null
}

export default TagHeader
