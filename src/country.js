import { deepFreeze } from './utils'

export default class Country {
  // Following properties are allowed to be used in filtering `Countries`.
  static activeProps = ['isoA2', 'isoA3', 'isoN3', 'region', 'subregion']

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
