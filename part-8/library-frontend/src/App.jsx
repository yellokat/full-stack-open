import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)

  const showNotification = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      {/* navigation bar */}
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      {/* error notification widget */}
      <Notification errorMessage={errorMessage} />

      {/*content*/}
      <Authors show={page === "authors"} setError={showNotification} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setError={showNotification} />
    </div>
  );
};

export default App;
