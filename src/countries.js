import { deepFreeze } from './utils'
import { activeProps } from './country'

export default class Countries {
  constructor(countries) {
    this.countries = countries
    deepFreeze(this)
  }

  get all() {
    return this.countries
  }

  _checkPropExists(propName) {
    if (activeProps.indexOf(propName) < 0) {
      throw new Error(`Country\'s property ${propName} is not supported.`)
    }
  }

  _checkAllowedValues(propName, values) {
    const allowedValues = this.countries.map(v => v[propName])
    values.forEach(value => {
      if (allowedValues.indexOf(value) < 0) {
        throw new Error(`Value ${value} is not allowed.`)
      }
    })
  }

  _execFilter(propName, values, extractData) {
    this._checkPropExists(propName)
    this._checkAllowedValues(propName, values)
    return new Countries(extractData())
  }

  include(propName, values) {
    return this._execFilter(propName, values, () =>
      this.countries.filter(i => values.indexOf(i[propName]) != -1)
    )
  }

  exclude(propName, values) {
    return this._execFilter(propName, values, () =>
      this.countries.filter(i => values.indexOf(i[propName]) == -1)
    )
  }
}
