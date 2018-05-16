// Hey Emacs, this is -*- coding: utf-8 -*-

import * as fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const schemaString = fs.readFileSync('/home/rh/artizanya/land/src/graphql/schema.graphql', 'utf8');

// const schemaString = `
// """
// Species of a character: human or droid.
// """
// enum Species {
//   """
//   A humanoid creature in the Star Wars universe.
//   """
//   HUMAN

//   """
//   A mechanical creature in the Star Wars universe.
//   """
//   DROID
// }
// `;

const schemaExequtable = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers,
});

export default schemaExequtable;

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
// schemaExequtable = makeExecutableSchema({
//   typeDefs: schemaString,
//   resolvers,
// });
