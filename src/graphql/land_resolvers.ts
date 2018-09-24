// Hey Emacs, this is -*- coding: utf-8 -*-

import { db, aql } from '@arangodb';

const elements = module.context.collection('elements');

const resolvers = {
  Element: {
    id: (obj, args, context, info) => obj._key
  },

  Query: {
    element: (obj, args, context, info) => {
      return elements.firstExample({
        _key: args.id
      });
    },

    elements: (obj, args, context, info) => {
      return db._query(aql`
        FOR element IN ${elements}
        RETURN element
      `);
    },
  }
};

export default resolvers;
