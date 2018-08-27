// Hey Emacs, this is -*- coding: utf-8 -*-

import { db, aql } from '@arangodb';

const elements = module.context.collection('elements');

const resolvers = {
  Element: {
    id: (obj) => obj._key
  },

  Query: {
    element: (obj, args, context, info) => {
      return elements.firstExample({
        _key: args.id
      });
    },

    elementIds: (obj, args, context, info) => {
      return db._query(aql`
        FOR entry IN ${elements}
        RETURN entry._key
      `);
    },
  }
};

export default resolvers;
