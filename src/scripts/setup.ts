// -*- coding: utf-8 -*-:

import { db } from '@arangodb';

interface Element {
  _key: string;
  name: string;
  description: string;
  origin: string;
  processes: any[];
  alternatives: Element[];
}

const elementsArray: Element[] = [
  {
    _key: '0000',
    name: '17HS4401',
    description: '',
    origin: 'MotionKing (China) Motor Industry',
    processes: [],
    alternatives: [],
  },
  {
    _key: '0001',
    name: '3D076',
    description: 'GT2 20T Belt Pulley',
    origin: 'WODE',
    processes: [],
    alternatives: [],
  },
  {
    _key: '0002',
    name: 'M3 30mm Cap Screw',
    description: 'M3 30mm Cap Screw',
    origin: '',
    processes: [],
    alternatives: [],
  },
  {
    _key: '0003',
    name: 'M3 12mm Cap Screw',
    description: 'M3 12mm Cap Screw',
    origin: '',
    processes: [],
    alternatives: [],
  },
  {
    _key: '0004',
    name: 'M3 Self Locking Nut',
    description: 'M3 Self Locking Nut',
    origin: '',
    processes: [],
    alternatives: [],
  },
  {
    _key: '0005',
    name: 'LM8UU',
    description: '8mm Linear Ball Bearing',
    origin: '',
    processes: [],
    alternatives: [],
  },
  {
    _key: '0006',
    name: 'X Motor Printed Part, Leadscrews',
    description: '',
    processes: [],
    origin: 'HTA3D',
    alternatives: [],
  },
  {
    _key: '0007',
    name: 'Xmotor Assembly, Leadscrews',
    description: '',
    origin: 'HTA3D',
    processes: ['processes/0001'],
    alternatives: [],
  }
];

interface Input {
  _key: string;
  count: number;
  element: Element;
}

interface Output {
  _key: string;
  count: number;
  element: Element;
}

interface Process {
  _key: string;
  name: string;
  description: string;
  // tools: any[];
  // skills: any[];
  outputs: Input[];
  inputs: Output[];
  // origin: string;
  alternatives: Process[];
}

// let categories = [{
//   category: 'Electronic',
//   children: [{
//     category: 'ADC',
//     description: 'Analogue-to-Digital Converters',
//   }, {
//     category: 'DAC',
//     description: 'Digital-to-Analogue Converters',
//   }]
// }, {
//   category: 'Electric Motors',
//   description: 'Electric Motors, Motor Controllers & Peripherals',
//   children: [{
//     category: 'Stepper Motors',
//     description: '',
//     children: [{
//       element: '0001'
//     }]
//   }]
// }];

// class ComponentGenesis {
//   static readonly NATIVE  = 0;
//   static readonly FOREIGN = 1;
//   static readonly NATURAL = 2;
// }

// class ComponentRole {
//   static readonly PART       = 0;
//   static readonly CONSUMABLE = 1;
//   static readonly INSTRUMENT = 2;
//   static readonly BYPRODUCT  = 3;
//   static readonly PRODUCT    = 4;
// }

// let processes = [{
//   id: '0001',
//   name: 'Xmotor, Leadscrews version',
//   description: 'Manual assembly of Xmotor, Leadscrews version',
//   origin: 'ramblehead',
//   output: [{
//     element: 'elements/0008',
//     role: ComponentRole.PRODUCT,
//     genesis: ComponentGenesis.NATIVE,
//     count: 1,
//   }],
//   input: [{
//     element: 'elements/0001',
//     variants: null,
//     role: ComponentRole.PART,
//     genesis: ComponentGenesis.FOREIGN,
//     count: 1,
//   }, {
//     element: 'elements/0002',
//     variants: null,
//     role: ComponentRole.PART,
//     genesis: ComponentGenesis.FOREIGN,
//     count: 1,
//   }, {
//     element: 'elements/0003',
//     variants: null,
//     role: ComponentRole.PART,
//     genesis: ComponentGenesis.FOREIGN,
//     count: 1,
//   }, {
//     element: 'elements/0004',
//     variants: null,
//     role: ComponentRole.PART,
//     genesis: ComponentGenesis.FOREIGN,
//     count: 7,
//   }, {
//     element: 'elements/0005',
//     variants: null,
//     role: ComponentRole.PART,
//     genesis: ComponentGenesis.FOREIGN,
//     count: 1,
//   }, {
//     element: 'elements/0006',
//     variants: null,
//     role: ComponentRole.PART,
//     genesis: ComponentGenesis.FOREIGN,
//     count: 2,
//   }, {
//     element: 'elements/0007',
//     variants: null,
//     role: ComponentRole.PART,
//     genesis: ComponentGenesis.FOREIGN,
//     count: 1,
//   }]
// }];

const elementsCollectionName = module.context.collectionName('elements');
if(!db._collection(elementsCollectionName)) {
  const elements = db._createDocumentCollection(elementsCollectionName);
  elementsArray.forEach((element: Element) => {
    elements.save(element);
  });
}
else if(module.context.isProduction) {
  console.warn(`collection ${elementsCollectionName} \
already exists. Leaving it untouched.`);
}

const elementsOrderCollectionName = module.context.collectionName('elementsOrder');
if(!db._collection(elementsOrderCollectionName)) {
  const elementsOrder = db._createEdgeCollection(elementsOrderCollectionName);
  [
    ['0000', '0001'],
    ['0001', '0002'],
    ['0002', '0003'],
    ['0003', '0004'],
    ['0004', '0005'],
    ['0005', '0006'],
    ['0006', '0007'],
  ].forEach(pair => {
    elementsOrder.save(
      elementsCollectionName + '/' + pair[0],
      elementsCollectionName + '/' + pair[1],
      {}
    );
  });
}
else if(module.context.isProduction) {
  console.warn(`collection ${elementsOrderCollectionName} \
already exists. Leaving it untouched.`);
}
