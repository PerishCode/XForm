import { Factory, __fragment__ } from '@perish/react-xform'
import { combine } from '../utils'

function XArray({ schema: { items = [], template } }) {
  return items.map((item, index) =>
    Factory({ schema: combine(template, item), index })
  )
}

function XObject({ schema: { properties = {} } }) {
  return Object.keys(properties).reduce((result, key) => {
    const children = Factory({ schema: properties[key], index: key })

    Array.isArray(children)
      ? (result = result.concat(children))
      : result.push(children)

    return result
  }, [] as any)
}

XArray[__fragment__] = true
XObject[__fragment__] = true

export { XArray, XObject }
