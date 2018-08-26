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
    }
  }
};

export default resolvers;
