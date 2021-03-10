import { IntlProvider } from 'react-intl'
import Filter from '../Filter'
import Gallery from '../Gallery'
import Map from '../Map'
import PageTitle from '../PageTitle'
import PencilInfo from '../PencilInfo'
import Taxonomy from '../Taxonomy'

const App = () => (
  <IntlProvider locale="ru" defaultLocale="ru">
    <Taxonomy>
      <PageTitle />
      <PencilInfo />
      <nav className="App-block">
        <aside className="romanyanke">
          <a href="https://yanke.ru">
            <img src="https://avatars.githubusercontent.com/romanyanke?size=32" alt="Roman Yanke" />
          </a>
        </aside>
        <Filter />
      </nav>
      <Map />
      <main className="App-block">
        <Gallery />
      </main>
    </Taxonomy>
  </IntlProvider>
)

export default App
