import classes from './App.module.css'
import { Settings } from '../Settings/Settings'
import { PencilPopup } from '../PencilPopup/PencilPopup'
import { Grid } from '../Feed/Grid/Grid'
import { InfiniteScroll } from '../Feed/InfiniteScroll/InfiniteScroll'
import { LoadMoreButton } from '../Feed/LoadMoreButton/LoadMoreButton'
import { Filter } from '../Filter/Filter'
import { Title } from '../Title/Title'
import { Map } from '../Map/Map'

export const App = () => (
  <>
    <div className={classes.map}>
      <Map />
    </div>

    <div className={classes.settings}>
      <Settings />
    </div>

    <main>
      <header>
        <Filter />
        <Title />
      </header>

      <div className={classes.grid}>
        <Grid />
      </div>

      <aside>
        <PencilPopup />
      </aside>

      <footer>
        <LoadMoreButton />
        <InfiniteScroll />
      </footer>
    </main>
  </>
)
