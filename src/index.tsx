import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import App from './App'
import Feed from './Feed'
import { store } from './store'
import State from './State'
import './main.css'
import { Taxonomy } from './Taxonomy/Taxonomy'
import { Theme } from './Theme/Theme'
import { LanguageProvider } from './LanguageProvider/LanguageProvider'

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
