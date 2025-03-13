import {useEffect, useState} from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm.jsx";
import {useApolloClient, useMutation, useQuery} from "@apollo/client";
import {ALL_AUTHORS, ALL_BOOKS, LOGIN, ME} from "./queries.js";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)
  const [favoriteGenre, setFavoriteGenre] = useState(null)
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

  // my info query
  const myInfoResponse = useQuery(ME)

  // my info query result handler
  useEffect(() => {
    if (myInfoResponse.loading === false && !myInfoResponse.error){
      setFavoriteGenre(myInfoResponse.data.me.favoriteGenre)
    }
  }, [myInfoResponse]);

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
    await myInfoResponse.refetch()
  }

  // logout handler
  const handleLogout = async (event) => {
    event.preventDefault()

    // navigate to front page
    await setPage("authors")

    // clear credentials
    setToken(null)
    localStorage.removeItem('token')

    // clear apollo query cache
    await client.resetStore()

    // refetch my info
    await myInfoResponse.refetch()
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
            <button onClick={() => setPage("recommendations")}>recommendations</button>
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
      <NewBook show={page === "add"} setError={showNotification} isLoggedIn={ !!token }/>
      <Recommendations show={page === "recommendations"} favoriteGenre={favoriteGenre} isLoggedIn={ !!token }/>
      <LoginForm show={page === "login"} handleLogin={handleLogin} setError={showNotification}/>
    </div>
  );
};

export default App;
