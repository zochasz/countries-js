# Countries JS

A wrapper over the [iso-3166-countries](https://github.com/aktitarov/iso-3166-countries). With additional models and constants to effectively work with countries source, filtering and fetching their properties.

## Usage

Creating from raw data (json)

```js
...

import { Country, Countries } from 'countries-js'
import data from '<path-to-your-source>'

const countries = new Countries(data.map(i => new Country(i)))
// countries now ready to use.

...
```

Filtering by specific criteria

```js
import { Regions, Subregions } from 'countries-js'

const { Europe, Asia, Africa } = Regions
const { NorthernEurope, SouthAsia, CentralAfrica } = Subregions

...

countries
  .include("region", [Europe, Asia, Africa])
  .exclude("subregion", [NorthernEurope, SouthAsia, CentralAfrica])
  .exclude("isoA2", ["TH", "AS", "VN", "IT", "ES", "FR", "UG", "PL"])

...
```

Gives you a list of Countries which are:
  * Placed in Europe, Africa and Asia
  * Not in Northern Europe, South Asia and Central Africa
  * ISO-3166 alpha-2 not equal to TH, AS, VN, IT, ES, FR, UG, Pl.

## License

[Mozilla Public License](https://www.mozilla.org/en-US/MPL/2.0/) MPL 2.0