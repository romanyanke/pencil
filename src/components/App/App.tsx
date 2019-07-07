import React, { Fragment } from 'react'
import { addLocaleData, IntlProvider } from 'react-intl'
import ru from 'react-intl/locale-data/ru'
import { BrowserRouter } from 'react-router-dom'
import Filter from '../Filter'
import { useFilter } from '../Filter/Filter.hooks'
import Gallery from '../Gallery'
import Loader from '../Loader'
import Map from '../Map'
import PencilInfo from '../PencilInfo'
import TagHeader from '../PencilInfo/TagHeader'
import Taxonomy from '../Taxonomy'

addLocaleData(ru)

const App: React.FC = () => {
  const [filter] = useFilter()
  return (
    <Taxonomy>
      {({ requestStatus: { pending, fulfilled, rejected } }) => {
        if (rejected) {
          return (
            <div className="App-loading">
              <button onClick={() => window.location.reload()}>не могу загрузить</button>
            </div>
          )
        }
        return pending ? (
          <div className="App-loading">
            <Loader />
          </div>
        ) : fulfilled ? (
          <div className="App">
            <IntlProvider locale="ru" defaultLocale="ru" textComponent={Fragment}>
              <BrowserRouter>
                <PencilInfo />
                <section className="App-block">
                  <Filter />
                </section>

                {filter.tag ? (
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
            </IntlProvider>
          </div>
        ) : null
      }}
    </Taxonomy>
  )
}

export default App
