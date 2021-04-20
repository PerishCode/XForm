import { Factory, __fragment__ } from '@x-form/react'

function XObject({ schema: { properties = {} } }) {
  return Object.keys(properties).reduce((result, key) => {
    const children = Factory({ schema: properties[key], index: key })

    Array.isArray(children)
      ? (result = result.concat(children))
      : result.push(children)

    return result
  }, [] as any)
}

XObject[__fragment__]

export default XObject
