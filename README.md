# Countries JS

A wrapper over the [iso-3166-countries](https://github.com/aktitarov/iso-3166-countries), adds extra constants and models to effectively work with countries, filtering and fetching their properties.

## Scheme

Every country have the following scheme

```js
{
  // Country's common name
  name: {
    type: String,
    required: true
  },
  // ISO-3166 alpha-2
  isoA2: {
    type: String,
    required: true
  },
  // ISO-3166 alpha-3
  isoA3: {
    type: String,
    required: true
  },
  // ISO-3166 numeric
  isoN3: {
    type: String,
    required: true
  },
  // Europe, Asia, etc
  region: {
    type: String,
    required: true
  },
  // North America, Central Asia, etc
  subregion: {
    type: String,
    required: false
  },
  // +1, +93, etc. but without +
  phoneCode: {
    type: String,
    required: false
  },
  // Country's name translations
  translations: {
    // Deutsch
    de: {
      type: String,
      required: true
    },
    // Spanish
    es: {
      type: String,
      required: true
    },
    // French
    fr: {
      type: String,
      required: true
    },
    // Japanese
    ja: {
      type: String,
      required: true
    },
    // Italian
    it: {
      type: String,
      required: true
    },
    // Brazilian Portuguese
    br: {
      type: String,
      required: true
    },
    // Portuguese
    pt: {
      type: String,
      required: true
    },
    // Dutch
    nl: {
      type: String,
      required: true
    },
    // Croatian
    hr: {
      type: String,
      required: true
    },
    // Farsi
    fa: {
      type: String,
      required: true
    }
  }
}
```

**Regions**:
* Africa
* Americas
* Asia
* Europe
* Oceania
* Polar

**Subregions**:
* Australia and New Zealand
* Caribbean
* Central America
* Central Asia
* Eastern Africa
* Eastern Asia
* Eastern Europe
* Melanesia
* Micronesia
* Middle Africa
* Northern Africa
* Northern America
* Northern Europe
* Polynesia
* South America
* South-Eastern Asia
* Southern Africa
* Southern Asia
* Southern Europe
* Western Africa
* Western Asia
* Western Europe

## Usage

Filtering

```js
import { countries, regions, subregions } from 'countries-js'

const { Europe, Africa } = regions
const { NorthernEurope } = subregions

countries
  .include('region', [Europe, Africa])
  .exclude('subregion', [NorthernEurope])
  .exclude('isoA2', ['FR', 'ES', 'IT'])

...
```

Gives you a list of countries that are:
* Located in Europe and Africa
* But not located in Northern Europe
* ISO-3166 alpha-2 code not equal to FR, ES or IT

You can combine as much filters as you need to get a specific result, it's as easy as adding another include or exclude statement.

Fetching

```js
...

countries.all // Gives all countries in a set
countries.first // Sometimes you need only the first
countries.last // or maybe the last one

...
```

## License

[Mozilla Public License](https://www.mozilla.org/en-US/MPL/2.0/) MPL 2.0