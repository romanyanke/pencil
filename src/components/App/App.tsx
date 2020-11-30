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
