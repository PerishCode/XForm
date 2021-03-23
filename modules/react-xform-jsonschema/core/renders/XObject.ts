import { Factory, __fragment__ } from '@perish/react-xform'

function XObject({ schema: { properties } }) {
  return Object.keys(properties || {}).reduce((result, key) => {
    const children = Factory({ schema: properties[key], index: key })
    if (Array.isArray(children)) result = result.concat(children)
    else result.push(children)
    return result
  }, [] as any)
}

XObject[__fragment__] = true

export default XObject
