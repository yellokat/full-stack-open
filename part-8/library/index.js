const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
mongoose = require("mongoose")
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const config = require("./utils/config")

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
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
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const whereClause = {}

      if(args.genre){
        whereClause.genres = { $in: [args.genre] }
      }

      if(args.author){
        const foundAuthor = await Author.find({name: args.author})
        if(foundAuthor.length !== 0){
          whereClause.author = foundAuthor[0].id
        }
      }

      return await Book
        .find(whereClause)
        .populate('author', { name: 1, born: 1 })
    },
    allAuthors: async () => {
      return await Author.find({})
    }
  },
  Mutation: {
    addBook: async (root, args) =>
    {
      // check if author exists
      let foundAuthors = await Author.find({name: args.author})

      // create author if not exist
      if (foundAuthors.length === 0){
        const newAuthor = new Author({ name: args.author })
        foundAuthors.push(await newAuthor.save())
      }

      // create book
      const newBook = new Book({ ...args , author: foundAuthors[0].id })
      const createdBook = await newBook.save()
      return await createdBook.populate('author', {name:1, born:1})
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: {port: config.PORT},
}).then(({url}) => {
  console.log(`Server ready at ${url}`)
})