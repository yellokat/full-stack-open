const Book = require("../models/book");
const Author = require("../models/author");
const {GraphQLError} = require("graphql/error");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const {PubSub} = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Author: {
    bookCount: (root) => {
      return root.books.length
    }
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const whereClause = {}

      if (args.genre) {
        whereClause.genres = {$in: [args.genre]}
      }

      if (args.author) {
        const foundAuthor = await Author.find({name: args.author})
        if (foundAuthor.length !== 0) {
          whereClause.author = foundAuthor[0].id
        }
      }

      return await Book
        .find(whereClause)
        .populate('author', {name: 1, born: 1})
    },
    allAuthors: async () => {
      return await Author.find({}).populate('books', {title: 1, published: 1, genres: 1, id: 1, author: 1})
    },
    allGenres: async () => {
      const allBooks = await Book.find({})
      const allGenres = [...
        new Set(
          [...allBooks].map(book => {
            return book.genres
          }).reduce((acc, genre) => acc.concat(genre))
        )]
      return Array.from(allGenres)
    },
    me: (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('You are not logged in.', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      // identity check
      if (!context.currentUser) {
        throw new GraphQLError('You are not logged in.', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      // check if author exists
      let foundAuthors = await Author.find({name: args.author})

      // create author if not exist
      if (foundAuthors.length === 0) {
        const newAuthor = new Author({name: args.author})
        foundAuthors.push(await newAuthor.save())
      }
      const targetAuthor = foundAuthors[0]

      // create book
      const newBook = new Book({...args, author: targetAuthor.id})
      const createdBook = await newBook.save()
      const resultBook = await createdBook.populate('author', {name: 1, born: 1})

      // assign book to author as well
      targetAuthor.books.push(resultBook.id)
      await targetAuthor.save()

      // publish creation of book to subscribers
      pubsub.publish('BOOK_ADDED', {bookAdded: resultBook})

      return resultBook
    },
    editAuthor: async (root, args, context) => {
      // identity check
      if (!context.currentUser) {
        throw new GraphQLError('You are not logged in.', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      // check if author exists
      let foundAuthors = await Author.find({name: args.name})
      if (foundAuthors.length === 0) {
        throw new GraphQLError(`No authors with name ${args.name} found.`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }

      // update author
      const updatedAuthor = await Author.findByIdAndUpdate(
        foundAuthors[0].id,
        {born: args.setBornTo},
        {new: true, runValidators: true}
      )

      return updatedAuthor
    },
    createUser: async (root, args) => {
      // password is same across all users and is hardcoded
      const username = args.username
      const password = "GLOBAL_PASSWORD"
      const favoriteGenre = args.favoriteGenre

      // encrypt password
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      // create user -> save user -> return
      const newUser = new User({username, passwordHash, favoriteGenre})
      const createdUser = await newUser.save()
      return createdUser
    },
    login: async (root, args) => {
      const username = args.username
      const password = args.password

      // find user and compare password
      const user = await User.findOne({username})
      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

      // return 401 if credentials are incorrect
      if (!(user && passwordCorrect)) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      // generate new JWT
      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return {value: jwt.sign(userForToken, config.JWT_SECRET)}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers