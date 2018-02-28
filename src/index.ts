// -*- coding: utf-8; mode: typescript -*-

import schema from './schema'
import * as createGraphqlRouter from '@arangodb/foxx/graphql'

import { graphql, formatError }  from 'graphql-sync'

// This is a regular Foxx router.
const router = createGraphqlRouter({schema, graphiql: true})
  .summary('GraphQL endpoint')
  .description('GraphQL endpoint for the Star Wars GraphQL example.');
module.context.use(router);
