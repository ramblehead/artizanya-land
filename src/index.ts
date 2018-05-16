// -*- coding: utf-8 -*-

import schema from './schema';
import * as graphql from 'graphql';
import * as createGraphqlRouter from '@arangodb/foxx/graphql';

import schemaExequtable from './graphql/schema';
const sss = schemaExequtable;

// This is a regular Foxx router.
const router = createGraphqlRouter({
  schema,
  graphiql: true,
  graphql: graphql,
}).summary('GraphQL endpoint')
  .description('GraphQL endpoint for the Star Wars GraphQL example.');

module.context.use(router);
