// Hey Emacs, this is -*- coding: utf-8 -*-

import * as fs from 'fs';
import * as path from 'path';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './land_resolvers';

const schemaString =
  fs.readFileSync(path.resolve(__dirname, 'land.graphql'), 'utf8');

const schemaExequtable = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers,
});

export default schemaExequtable;
