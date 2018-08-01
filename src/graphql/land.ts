// Hey Emacs, this is -*- coding: utf-8 -*-

let elements = [{
  id: '0001',
  name: '17HS4401',
  description: '',
  vendor: 'MotionKing (China) Motor Industry',
  directory: '0001'
}, {
  id: '0002',
  name: '3D076',
  description: 'GT2 20T Belt Pulley',
  vendor: 'WODE',
  directory: '0002'
}, {
  id: '0003',
  name: '',
  description: 'M3 30mm Cap Screw',
  vendor: '',
  directory: '0003'
}, {
  id: '0004',
  name: '',
  description: 'M3 12mm Cap Screw',
  vendor: '',
  directory: '0004'
}, {
  id: '0005',
  name: '',
  description: 'M3 Self Locking Nut',
  vendor: '',
  directory: '0005'
}, {
  id: '0006',
  name: 'Xmotor, Leadscrews version',
  description: '',
  vendor: 'HTA3D',
  directory: '0006'
}];

let categories = [{
  category: 'Electronic',
  children: [{
    category: 'ADC',
    description: 'Analogue-to-Digital Converters',
  }, {
    category: 'DAC',
    description: 'Digital-to-Analogue Converters',
  }]
}, {
  category: 'Electric Motors',
  description: 'Electric Motors, Motor Controllers & Peripherals',
  children: [{
    category: 'Stepper Motors',
    children: [{
      element: '0001'
    }]
  }]
}];

import { db, aql } from '@arangodb';

// Using module.context.collection allows us to use the
// collection with a common prefix based on where the service
// is mounted. This way we can have multiple copies of this
// service mounted on the same database without worrying about
// name conflicts in their collections.
const episodes = module.context.collection('episodes');
const characters = module.context.collection('characters');
const friends = module.context.collection('friends');
const appearsIn = module.context.collection('appearsIn');

const resolvers = {
  Species: {
    HUMAN: 'human',
    DROID: 'droid'
  },

  Episode: {
    id: (obj) => obj._key,
  },

  Character: {
    __resolveType: (obj, context, info) => {
      // Droids and humans have different fields.
      // The "$type" property allows GraphQL to decide which
      // GraphQL type a document should correspond to.
      return obj.$type === 'droid' ? 'Droid' : 'Human';
    }
  },

  Human: {
    id: (obj) => obj._key,

    species: (obj) => obj.$type,

    friends: (obj, args, context, info) => {
      // We want to store friendship relations as edges in an
      // edge collection. Here we're returning the friends of
      // a character with an AQL graph traversal query, see
      // https://docs.arangodb.com/Aql/GraphTraversals.html#working-on-collection-sets
      const species = args.species || null;
      return db._query(aql`
        FOR friend IN ANY ${obj} ${friends}
        FILTER !${species} || friend.$type == ${species}
        SORT friend._key ASC
        RETURN friend
      `).toArray();
    },

    appearsIn: (obj, args, context, info) => {
      // This query is similar to the friends query except
      // episode appearances are directional (a character
      // appears in an episode, but an episode does not
      // appear in a character), so we are only interested
      // in OUTBOUND edges.
      return db._query(aql`
        FOR episode IN OUTBOUND ${obj._id} ${appearsIn}
        SORT episode._key ASC
        RETURN episode
      `).toArray();
    }
  },

  Droid: {
    id: (obj) => obj._key,

    species: (obj) => obj.$type,

    friends: (obj, args, context, info) => {
      const species = args.species || null;
      return db._query(aql`
        FOR friend IN ANY ${obj} ${friends}
        FILTER !${species} || friend.$type == ${species}
        SORT friend._key ASC
        RETURN friend
      `).toArray();
    },

    appearsIn: (obj, args, context, info) => {
      return db._query(aql`
        FOR episode IN OUTBOUND ${obj._id} ${appearsIn}
        SORT episode._key ASC
        RETURN episode
      `).toArray();
    }
  },

  Query: {
    hero: (obj, args) => {
      return characters.document(
        args.episode === 'NewHope' ? '1000' :
          args.episode === 'Awakens' ? '2002' : '2001');
    },

    human: (obj, args, context, info) => {
      // We're using firstExample to make sure we only
      // return documents with the right "$type".
      return characters.firstExample({
        _key: args.id,
        $type: 'human'
      });
    },

    droid: (obj, args, context, info) => {
      return characters.firstExample({
        _key: args.id,
        $type: 'droid'
      });
    }
  }

};

export default resolvers;
