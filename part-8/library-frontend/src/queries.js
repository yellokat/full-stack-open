// noinspection GraphQLUnresolvedReference

import {gql} from '@apollo/client'

export const ALL_AUTHORS = gql`
    query{
        allAuthors{
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query allBooks($genre: String){
        allBooks(genre: $genre) {
            author {
                name
                born
            }
            genres
            published
            title
        }
    }
`

export const ALL_GENRES = gql`
    query{
        allGenres
    }
`

export const ME = gql`
  query{
      me{
          favoriteGenre
      }
  }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title,
            author{
                name
                born
            }
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!){
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!){
        login(
            username: $username,
            password: $password
        ){
            value
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title,
            author {
                name,
                born
            },
            published,
            genres
        }
    }
`