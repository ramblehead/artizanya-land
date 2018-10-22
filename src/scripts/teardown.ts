// -*- coding: utf-8 -*-:

import { db } from '@arangodb';

db._drop(module.context.collectionName('elements'));
db._drop(module.context.collectionName('elementsOrder'));
