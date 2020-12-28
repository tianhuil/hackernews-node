const fs = require('fs')
const path = require('path')

const { ApolloServer } = require('apollo-server')

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
  {
    id: 'link-1',
    url: 'www.example.com',
    description: 'Example Domain',
  },
]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const newLink = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(newLink)
      return newLink
    },
    delete: (parent, args) => {
      link = links.find((link) => link.id === args.id)
      if (!link) {
        return new Error(`No element with id ${args.id}`)
      }
      links = links.filter((link) => link.id === args.id)
      return link
    },
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
  resolvers,
})

server.listen().then(({ url }) => console.log(`Server is running on ${url}`))
