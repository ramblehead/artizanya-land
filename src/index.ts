// -*- coding: utf-8 -*-

import schema from './schema';

import * as graphql from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import * as createGraphqlRouter from '@arangodb/foxx/graphql';

import schemaExequtable from './graphql/schema';

// // Some fake data
// const books = [
//   {
//     title: 'Harry Potter and the Sorcerer\'s stone',
//     author: 'J.K. Rowling',
//   },
//   {
//     title: 'Jurassic Park',
//     author: 'Michael Crichton',
//   },
// ];

// // The GraphQL schema in string form
// const schemaString = `
//   type Query { books: [Book] }
//   type Book { title: String, author: String }
// `;

// // The resolvers
// const resolvers = {
//   Query: { books: () => books },
// };

// // Put together a schema
// let schemaExequtable = makeExecutableSchema({
//   typeDefs: schemaString,
//   resolvers,
// });


// This is a regular Foxx router.
const router = createGraphqlRouter({
  // schema,
  schema: schemaExequtable,
  graphiql: true,
  graphql: graphql,
}).summary('GraphQL endpoint')
  .description('GraphQL endpoint for the Star Wars GraphQL example.');

module.context.use(router);
