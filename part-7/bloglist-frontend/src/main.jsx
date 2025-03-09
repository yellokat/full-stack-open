import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store.js'

const rootElement = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  rootElement.render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
}

renderApp()
store.subscribe(renderApp)
