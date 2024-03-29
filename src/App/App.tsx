import classes from './App.module.css'
import Grid from '../Feed/Grid'
import Filter from '../Filter'
import Map from '../Map'
import InfiniteScroll from '../Feed/InfiniteScroll'
import LoadMoreButton from '../Feed/LoadMoreButton'
import Title from '../Title'
import { Settings } from '../Settings/Settings'
import { PencilPopup } from '../PencilPopup/PencilPopup'

const App = () => (
  <main className={classes.root}>
    <Map />

    <header>
      <Filter />
      <Title />
    </header>

    <div className={classes.settings}>
      <Settings />
    </div>

    <Grid />

    <aside>
      <PencilPopup />
    </aside>

    <footer>
      <LoadMoreButton />
      <InfiniteScroll />
    </footer>
  </main>
)

export default App
