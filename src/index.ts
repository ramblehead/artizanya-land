// -*- coding: utf-8 -*-

import * as graphql from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import * as createGraphqlRouter from '@arangodb/foxx/graphql';

import schemaExequtable from './graphql/schema';

const router = createGraphqlRouter({
  schema: schemaExequtable,
  graphiql: true,
  graphql: graphql,
}).summary('GraphQL Endpoint')
  .description('GraphQL endpoint for the Artizanya Land.');

module.context.use(router);
