import {useEffect, useState} from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm.jsx";
import {useApolloClient, useMutation} from "@apollo/client";
import {ALL_AUTHORS, ALL_BOOKS, LOGIN} from "./queries.js";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  // auto login feature
  useEffect(() => {
    const localToken = localStorage.getItem("token")
    if (localToken) {
      setToken(localToken)
    }
  }, []);

  // login query
  const [login] = useMutation(LOGIN, {
    refetchQueries: [{query: ALL_AUTHORS}, {query: ALL_BOOKS}],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      showNotification(messages)
    }
  })

  // show notification handler
  const showNotification = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  // login handler
  const handleLogin = async (event, {username, password}) => {
    event.preventDefault()
    const result = await login({
      variables: {
        username,
        password
      }
    })
    const generatedToken = result.data.login.value
    setToken(generatedToken)
    localStorage.setItem('token', generatedToken)
    setPage("authors")
  }

  // logout handler
  const handleLogout = async (event) => {
    event.preventDefault()
    setToken(null)
    localStorage.removeItem('token')
    // clear apollo query cache
    await client.resetStore()
  }

  return (
    <div>
      {/* navigation bar */}
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ?
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={handleLogout}>logout</button>
          </>
          :
          <button onClick={() => setPage("login")}>login</button>
        }
      </div>

      {/* error notification widget */}
      <Notification errorMessage={errorMessage}/>

      {/*content*/}
      <Authors show={page === "authors"} setError={showNotification} isLoggedIn={ !!token }/>
      <Books show={page === "books"}/>
      <NewBook show={page === "add"} setError={showNotification}/>
      <LoginForm show={page === "login"} handleLogin={handleLogin} setError={showNotification}/>
    </div>
  );
};

export default App;
