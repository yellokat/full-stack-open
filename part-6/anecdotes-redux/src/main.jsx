import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import App from './App'
import store from "./store.js";

const rootElement = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  rootElement.render(
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

renderApp()
store.subscribe(renderApp)


