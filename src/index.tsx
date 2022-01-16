import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import Feed from './Feed'
import { store } from './store'
import Loader from './Loader'
import State from './State'
import './main.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <State>
        <Feed>
          <Loader>
            <App />
          </Loader>
        </Feed>
      </State>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
