import React from 'react'
import { FormattedMessage, IntlProvider } from 'react-intl'
import { appMessages } from './App.messages'
import Filter from '../Filter'
import { useFilter, useFilerQueryString } from '../Filter/Filter.hooks'
import Gallery from '../Gallery'
import Loader from '../Loader'
import Map from '../Map'
import PageTitle from '../PageTitle'
import PencilInfo from '../PencilInfo'
import TagHeader from '../PencilInfo/TagHeader'
import { useTaxonomyRequest } from '../Taxonomy/Taxonomy.hooks'

const App = () => {
  useFilerQueryString()
  const [{ tag }] = useFilter()
  const { pending, fulfilled, rejected } = useTaxonomyRequest()

  return (
    <IntlProvider locale="ru" defaultLocale="ru">
      {fulfilled ? (
        <>
          <PageTitle />
          <PencilInfo />
          <nav className="App-block">
            <Filter />
          </nav>
          {tag ? (
            <section className="App-block">
              <TagHeader />
            </section>
          ) : null}
          <section className="App-block">
            <Map />
          </section>
          <main className="App-block">
            <Gallery />
          </main>
        </>
      ) : (
        <div className="App-loading">
          {pending && <Loader />}
          {rejected && (
            <button onClick={() => window.location.reload()}>
              <FormattedMessage {...appMessages.error} />
            </button>
          )}
        </div>
      )}
    </IntlProvider>
  )
}

export default App
