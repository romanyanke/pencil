import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import App from './App'
import Feed from './Feed'
import { store } from './store'
import Loader from './Loader'
import State from './State'
import './main.css'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <Provider store={store}>
    <State>
      <Feed>
        <Loader>
          <App />
        </Loader>
      </Feed>
    </State>
  </Provider>,
)
