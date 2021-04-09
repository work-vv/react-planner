import {Catalog} from 'react-planner';

let catalog = new Catalog();

import * as Areas from './areas/**/planner-element.jsx';
import * as Lines from './lines/**/planner-element.jsx';
import * as Holes from './holes/**/planner-element.jsx';
import * as Items from './items/**/planner-element.jsx';

for( let x in Areas ) catalog.registerElement( Areas[x] );
for( let x in Lines ) catalog.registerElement( Lines[x] );
for( let x in Holes ) catalog.registerElement( Holes[x] );
for( let x in Items ) catalog.registerElement( Items[x] );

catalog.registerCategory('windows', 'Windows', [Holes.window, Holes.sashWindow, Holes.venetianBlindWindow, Holes.windowCurtain] );
catalog.registerCategory('doors', 'Doors', [Holes.door] );
catalog.registerCategory('kitchen', 'Kitchen', []);
catalog.registerCategory('bathroom', 'Bathroom', []);
catalog.registerCategory('dining-room', 'Dining room', []);
catalog.registerCategory('living-room', 'Living room', []);
catalog.registerCategory('baby-room', 'Kids & baby room', []);
catalog.registerCategory('bedroom', 'Bedroom', []);
catalog.registerCategory('office', 'Office', []);
catalog.registerCategory('outdoor', 'Outdoor', []);
catalog.registerCategory('lighting', 'Lighting', []);
catalog.registerCategory('electrical', 'Electrical', []);
catalog.registerCategory('accessories', 'Accessories', []);

export default catalog;
