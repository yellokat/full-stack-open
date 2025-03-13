import {useEffect, useState} from 'react';
import {useQuery, useSubscription} from "@apollo/client";
import {ALL_BOOKS, BOOK_ADDED} from "../queries.js";
import PropTypes from "prop-types";

function Recommendations({ show, favoriteGenre, isLoggedIn }) {
  const [favoriteBooks, setFavoriteBooks] = useState([])
  const favoriteBooksResponse = useQuery(ALL_BOOKS, { variables: {genre: favoriteGenre}})

  useSubscription(BOOK_ADDED, {
    onData: async ({data}) => {
      window.alert(`A new book was added to the database : ${data.data.bookAdded.title}`)
      await favoriteBooksResponse.refetch()
    }
  })

  useEffect(() => {
    if (favoriteBooksResponse.loading === false) {
      const fetchedBooks = [...favoriteBooksResponse.data.allBooks].map(book => {
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
      setFavoriteBooks(fetchedBooks)
    }
  }, [favoriteBooksResponse]);

  if (!show || !favoriteGenre || !isLoggedIn) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre {favoriteGenre}</p>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {favoriteBooks.map((a) => (
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

Recommendations.propTypes = {
  show : PropTypes.bool.isRequired,
  favoriteGenre : PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired
}

export default Recommendations;