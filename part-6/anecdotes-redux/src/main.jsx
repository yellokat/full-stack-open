import ReactDOM from 'react-dom/client'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'

const store = createStore(reducer)

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


