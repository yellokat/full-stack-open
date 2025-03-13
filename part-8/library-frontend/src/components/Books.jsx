import PropTypes from "prop-types";
import {useQuery, useSubscription} from "@apollo/client";
import {ALL_BOOKS, BOOK_ADDED} from "../queries.js";
import {useEffect, useState} from "react";

const Books = (props) => {
  const [books, setBooks] = useState()
  const response = useQuery(ALL_BOOKS)
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      books.push(data.data.bookAdded)
      window.alert(`A new book was added to the database : ${data.data.bookAdded.title}`)
    }
  })

  useEffect(() => {
    if(response.loading === false){
      const fetchedBooks = [...response.data.allBooks].map(book => {
        return {
          title: book.title,
          published: book.published,
          genres: book.genres,
          author: {
            name: book.author.name,
            born: book.author.born
          }
        }
      })
      setBooks(fetchedBooks)
    }
  }, [response]);

  if (!props.show) {
    return null
  }

  if (response.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Books
