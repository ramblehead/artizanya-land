// -*- coding: utf-8 -*-:

import { db } from '@arangodb';

// class ComponentGenesis {
//   static readonly NATIVE  = 0;
//   static readonly FOREIGN = 1;
//   static readonly NATURAL = 2;
// }

const elementsCollectionName = module.context.collectionName('elements');
const componentsCollectionName = module.context.collectionName('components');
const processesCollectionName = module.context.collectionName('processes');

const componentTypesEdgeCollectionName =
  module.context.collectionName('componentTypes');

type Key = string;
type ElementKey = string;
type ComponentKey = string;

interface Element {
  _key: Key;
  name: string;
  description: string;
  // origin: string;
  // alternatives: Element[];
}

interface Component {
  _key: Key;
  count: number;
  element: ElementKey;
}

interface Process {
  _key: Key;
  name: string;
  description: string;
  // tools: any[];
  // skills: any[];
  outputs: ComponentKey[];
  inputs: ComponentKey[];
  // origin: string;
  // alternatives: Process[];
}

const elementArray: Element[] = [
  {
    _key: '0000',
    name: '17HS4401',
    description: '',
    // origin: 'MotionKing (China) Motor Industry',
    // alternatives: [],
  },
  {
    _key: '0001',
    name: '3D076',
    description: 'GT2 20T Belt Pulley',
    // origin: 'WODE',
    // alternatives: [],
  },
  {
    _key: '0002',
    name: 'M3 30mm Cap Screw',
    description: 'M3 30mm Cap Screw',
    // origin: '',
    // alternatives: [],
  },
  {
    _key: '0003',
    name: 'M3 12mm Cap Screw',
    description: 'M3 12mm Cap Screw',
    // origin: '',
    // alternatives: [],
  },
  {
    _key: '0004',
    name: 'M3 Self Locking Nut',
    description: 'M3 Self Locking Nut',
    // origin: '',
    // alternatives: [],
  },
  {
    _key: '0005',
    name: 'LM8UU',
    description: '8mm Linear Ball Bearing',
    // origin: '',
    // alternatives: [],
  },
  {
    _key: '0006',
    name: 'X Motor Printed Part, Leadscrews',
    description: '',
    // origin: 'HTA3D',
    // alternatives: [],
  },
  {
    _key: '0007',
    name: 'Xmotor Assembly, Leadscrews',
    description: '',
    // origin: 'HTA3D',
    // alternatives: [],
  },
  {
    _key: '0008',
    name: 'GBP',
    description: 'UK Money',
    // origin: 'The UK',
    // alternatives: [],
  }
];

const componentArray: Component[] = [
  {
    _key: '0000',
    count: 1,
    element: elementsCollectionName + '/0000',
  },
  {
    _key: '0001',
    count: 1,
    element: elementsCollectionName + '/0001',
  },
  {
    _key: '0002',
    count: 1,
    element: elementsCollectionName + '/0002',
  },
  {
    _key: '0003',
    count: 1,
    element: elementsCollectionName + '/0003',
  },
  {
    _key: '0004',
    count: 1,
    element: elementsCollectionName + '/0004',
  },
  {
    _key: '0005',
    count: 1,
    element: elementsCollectionName + '/0005',
  },
  {
    _key: '0006',
    count: 1,
    element: elementsCollectionName + '/0006',
  },
  {
    _key: '0007',
    count: 1,
    element: elementsCollectionName + '/0007',
  },
  {
    _key: '0008',
    count: 1,
    element: elementsCollectionName + '/0008',
  },
];

const processesArray: Process[] = [
  {
    _key: '0000',
    name: 'Xmotor Assembly, Leadscrews',
    description: '',
    outputs: [
      componentsCollectionName + '/0007',
    ],
    inputs: [
      componentsCollectionName + '/0001',
      componentsCollectionName + '/0002',
      componentsCollectionName + '/0003',
      componentsCollectionName + '/0004',
      componentsCollectionName + '/0005',
      componentsCollectionName + '/0006',
    ],
    // alternatives: [],
  },
  {
    _key: '0001',
    name: 'Stepper Motor 17HS4401 Purchase',
    description: '',
    outputs: [componentsCollectionName + '/0000'],
    inputs: [componentsCollectionName + '/0009'],
  },
  {
    _key: '0002',
    name: 'Belt Pulley Purchase',
    description: '',
    outputs: [componentsCollectionName + '/0001'],
    inputs: [componentsCollectionName + '/0009'],
  },
  {
    _key: '0003',
    name: 'M3 30mm Cap Screw Purchase',
    description: '',
    outputs: [componentsCollectionName + '/0002'],
    inputs: [componentsCollectionName + '/0009'],
  },
  {
    _key: '0004',
    name: 'M3 12mm Cap Screw Purchase',
    description: '',
    outputs: [componentsCollectionName + '/0003'],
    inputs: [componentsCollectionName + '/0009'],
  },
];

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
//   _key: '0001',
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

if(!db._collection(elementsCollectionName)) {
  const elements = db._createDocumentCollection(elementsCollectionName);
  elementArray.forEach((element: Element) => {
    elements.save(element);
  });
}
else if(module.context.isProduction) {
  console.warn(`collection ${elementsCollectionName} \
already exists. Leaving it untouched.`);
}

if(!db._collection(componentsCollectionName)) {
  const components = db._createDocumentCollection(componentsCollectionName);
  componentArray.forEach((component: Component) => {
    components.save({
      _key: component._key,
      count: component.count,
    });
  });
}
else if(module.context.isProduction) {
  console.warn(`collection ${componentsCollectionName} \
already exists. Leaving it untouched.`);
}

if(!db._collection(componentTypesEdgeCollectionName)) {
  const componentTypes =
    db._createEdgeCollection(componentTypesEdgeCollectionName);

  componentArray.forEach(component => {
    componentTypes.save(
      componentsCollectionName + '/' + component._key,
      component.element,
      {});
  });
}
else if(module.context.isProduction) {
  console.warn(`collection ${componentTypesEdgeCollectionName} \
already exists. Leaving it untouched.`);
}


// if(!db._collection(processesCollectionName)) {
//   const processes = db._createDocumentCollection(processesCollectionName);
//   processesArray.forEach((process: Process) => {
//     processes.save(process);
//   });
// }
// else if(module.context.isProduction) {
//   console.warn(`collection ${processesCollectionName} \
// already exists. Leaving it untouched.`);
// }

// const processesInputsCollectionName =
//   module.context.collectionName('componentTypes');

// if(!db._collection(processesInputsCollectionName)) {
//   const componentTypes =
//     db._createEdgeCollection(processesInputsCollectionName);

//   [
//     ['0000', '0000'],
//     ['0001', '0000'],
//     ['0002', '0000'],
//     ['0003', '0000'],
//     ['0004', '0000'],
//     ['0005', '0000'],
//     ['0006', '0000'],
//   ].forEach(pair => {
//     componentTypes.save(
//       elementsCollectionName + '/' + pair[0],
//       processesInputsCollectionName + '/' + pair[1],
//       {}
//     );
//   });

//   componentTypes.save(
//     elementsCollectionName + '/0000',
//     processesInputsCollectionName + '/0000',
//     {}
//   );

// }
// else if(module.context.isProduction) {
//   console.warn(`collection ${processesInputsCollectionName} \
// already exists. Leaving it untouched.`);
// }
