import { deepFreeze } from './utils'

// Propety names which are useful
// for filtering countries set.
export const activeProps = ['isoA2', 'isoA3', 'isoN3', 'region', 'subregion']

export default class Country {
  constructor({
    name,
    isoA2,
    isoA3,
    isoN3,
    region = '',
    subregion = '',
    phoneCode = '',
    translations,
  }) {
    this.name = name
    this.isoA2 = isoA2
    this.isoA3 = isoA3
    this.isoN3 = isoN3
    this.region = region
    this.subregion = subregion
    this.phoneCode = phoneCode
    this.translations = translations
    deepFreeze(this)
  }
}
