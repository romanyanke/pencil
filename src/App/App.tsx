import classes from './App.module.css'
import Grid from '../Feed/Grid'
import Filter from '../Filter'
import Pencil from '../Pencil'
import Map from '../Map'
import InfiniteScroll from '../Feed/InfiniteScroll'
import LoadMoreButton from '../Feed/LoadMoreButton'
import Title from '../Title'
import { Theme } from '../Theme/Theme'

const App = () => (
  <main className={classes.root}>
    <div>
      <Theme />
      <Map />
    </div>

    <header>
      <Filter />
    </header>

    <Title />

    <Grid />

    <aside>
      <Pencil />
    </aside>

    <footer>
      <LoadMoreButton />
      <InfiniteScroll />
    </footer>
  </main>
)

export default App
