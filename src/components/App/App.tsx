import React from 'react'
import { FormattedMessage, IntlProvider } from 'react-intl'
import { appMessages } from './App.messages'
import Filter from '../Filter'
import { useFilerQueryString } from '../Filter/Filter.hooks'
import Gallery from '../Gallery'
import Loader from '../Loader'
import Map from '../Map'
import PageTitle from '../PageTitle'
import PencilInfo from '../PencilInfo'
import { useTaxonomyRequest } from '../Taxonomy/Taxonomy.hooks'

const App = () => {
  const { loading, failure } = useTaxonomyRequest()
  useFilerQueryString()

  return (
    <IntlProvider locale="ru" defaultLocale="ru">
      {loading || failure ? (
        <div className="App-loading">
          {loading && <Loader />}
          {failure && (
            <button onClick={() => window.location.reload()}>
              <FormattedMessage {...appMessages.error} />
            </button>
          )}
        </div>
      ) : (
        <>
          <PageTitle />
          <PencilInfo />
          <nav className="App-block">
            <Filter />
          </nav>
        </>
      )}
      <>
        <Map />
        <main className="App-block">
          <Gallery />
        </main>
      </>
    </IntlProvider>
  )
}

export default App
