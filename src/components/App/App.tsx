import React from 'react'
import { FormattedMessage, IntlProvider } from 'react-intl'
import { BrowserRouter } from 'react-router-dom'
import Filter from '../Filter'
import { useFilter } from '../Filter/Filter.hooks'
import Gallery from '../Gallery'
import Loader from '../Loader'
import Map from '../Map'
import PageTitle from '../PageTitle'
import PencilInfo from '../PencilInfo'
import TagHeader from '../PencilInfo/TagHeader'
import { useTaxonomyRequest } from '../Taxonomy/Taxonomy.hooks'
import { appMessages } from './App.messages'

const App = () => {
  const [{ tag }] = useFilter()
  const { pending, fulfilled, rejected } = useTaxonomyRequest()

  return (
    <IntlProvider locale="ru" defaultLocale="ru">
      {rejected ? (
        <div className="App-loading">
          <button onClick={() => window.location.reload()}>
            <FormattedMessage {...appMessages.error} />
          </button>
        </div>
      ) : pending ? (
        <div className="App-loading">
          <Loader />
        </div>
      ) : fulfilled ? (
        <div className="App">
          <BrowserRouter>
            <PageTitle />

            <PencilInfo />

            <section className="App-block">
              <Filter />
            </section>

            {tag ? (
              <section className="App-block">
                <TagHeader />
              </section>
            ) : (
              <Map />
            )}

            <section className="App-block">
              <Gallery />
            </section>
          </BrowserRouter>
        </div>
      ) : null}
    </IntlProvider>
  )
}

export default App
