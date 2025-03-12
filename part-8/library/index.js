const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')
const {v1: uuid} = require('uuid')
mongoose = require("mongoose")
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const config = require("./utils/config")
const {GraphQLError} = require("graphql/error");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: String!
  }
  
  type Author {
    name: String!
    id: String!
    born: Int
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User!
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
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
      return await Author.find({})
    },
    me: (root, args, context) => {
      if(!context.currentUser){
        throw new GraphQLError('You are not logged in.', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      // identity check
      if(!context.currentUser){
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

      // create book
      const newBook = new Book({...args, author: foundAuthors[0].id})
      const createdBook = await newBook.save()
      return await createdBook.populate('author', {name: 1, born: 1})
    },
    editAuthor: async (root, args, context) => {
      // identity check
      if(!context.currentUser){
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
      const newUser = new User({ username, passwordHash, favoriteGenre })
      const createdUser = await newUser.save()
      return createdUser
    },
    login: async (root, args) => {
      const username = args.username
      const password = args.password

      // find user and compare password
      const user = await User.findOne({ username })
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

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: {port: config.PORT},
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({url}) => {
  console.log(`Server ready at ${url}`)
})