export default function deepFreeze(obj) {
  for (const propName of Object.getOwnPropertyNames(obj)) {
    const prop = obj[propName]
    if (typeof prop == 'object' && prop !== null) {
      deepFreeze(prop)
    }
  }
  return Object.freeze(obj)
}
