import data from './data/countries'
import Country from './country'
import createManager from './manager'

export default (() => {
  let instance
  if (!instance) {
    const Manager = createManager(Country)
    instance = new Manager(data.map(v => new Country(v)))
  }
  return instance
})()
