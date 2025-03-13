import PropTypes from "prop-types";
import {useQuery, useSubscription} from "@apollo/client";
import {ALL_BOOKS, BOOK_ADDED, ALL_GENRES} from "../queries.js";
import {useEffect, useState} from "react";

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)

  const allBooksResponse = useQuery(ALL_BOOKS, { variables: {genre: selectedGenre}})
  const allGenresResponse = useQuery(ALL_GENRES)

  useSubscription(BOOK_ADDED, {
    onData: ({data}) => {
      books.push(data.data.bookAdded)
      window.alert(`A new book was added to the database : ${data.data.bookAdded.title}`)
    }
  })

  useEffect(() => {
    if (allBooksResponse.loading === false) {
      const fetchedBooks = [...allBooksResponse.data.allBooks].map(book => {
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
  }, [allBooksResponse]);

  useEffect(() => {
    if (allGenresResponse.loading === false) {
      setGenres([...allGenresResponse.data.allGenres])
    }
  }, [allGenresResponse]);

  if (!props.show) {
    return null
  }

  if (allBooksResponse.loading) {
    return <div>loading...</div>
  }

  const Subtitle = () => {
    return selectedGenre ?
      (<>In genre <b>{selectedGenre}</b></>) :
      (<>All Genres</>)
  }

  const GenreButtons = () => {
    const buttons = genres.map((genre) => {
      return (
        <button key={genre} onClick={()=>{setSelectedGenre(genre)}}>{genre}</button>
      )
    })
    buttons.push(
      <button key="all" onClick={()=>{setSelectedGenre(null)}}>All Genres</button>
    )
    return buttons
  }

  return (
    <div>
      <h2>books</h2>
      <Subtitle/>
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
      <GenreButtons/>
    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Books
