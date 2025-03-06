import ReactDOM from 'react-dom/client'
import {combineReducers, createStore} from 'redux'
import {Provider} from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const store = createStore(
  combineReducers({
    anecdote:anecdoteReducer,
    filter:filterReducer,
  })
)

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


