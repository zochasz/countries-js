import { deepFreeze } from './utils'

export default Class => {
  return class Manager {
    _checkDataItems(data) {
      data.forEach(item => {
        if (!(item instanceof Class)) {
          throw new Error(`Item ${item} is not an instance of ${Class}`)
        }
      })
    }

    constructor(data) {
      this._checkDataItems(data)
      this.data = data
      deepFreeze(this)
    }

    get all() {
      return this.data
    }

    get first() {
      return this.data[0]
    }

    get last() {
      return this.data[this.data.length - 1]
    }

    _checkPropActive(propName) {
      if (Class.activeProps.indexOf(propName) < 0) {
        throw new Error(`Property ${propName} is not supported`)
      }
    }

    _checkValuesAllowed(propName, values) {
      const allowedValues = this.data.map(v => v[propName])
      values.forEach(value => {
        if (allowedValues.indexOf(value) < 0) {
          throw new Error(`Value ${value} is not allowed`)
        }
      })
    }

    _execFilter(propName, values, extractData) {
      this._checkPropActive(propName)
      this._checkValuesAllowed(propName, values)
      return new Manager(extractData())
    }

    include(propName, values) {
      return this._execFilter(propName, values, () =>
        this.data.filter(i => values.indexOf(i[propName]) != -1)
      )
    }

    exclude(propName, values) {
      return this._execFilter(propName, values, () =>
        this.data.filter(i => values.indexOf(i[propName]) == -1)
      )
    }
  }
}
