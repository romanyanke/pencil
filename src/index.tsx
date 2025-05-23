import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { App } from './App/App'
import { Feed } from './Feed/Feed'
import { LanguageProvider } from './LanguageProvider/LanguageProvider'
import { State } from './State/State'
import { Taxonomy } from './Taxonomy/Taxonomy'
import { Theme } from './Theme/Theme'
import { store } from './store'
import './main.css'

import './style'
const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <Provider store={store}>
    <LanguageProvider>
      <State>
        <Feed>
          <Theme>
            <Taxonomy>
              <App />
            </Taxonomy>
          </Theme>
        </Feed>
      </State>
    </LanguageProvider>
  </Provider>,
)
