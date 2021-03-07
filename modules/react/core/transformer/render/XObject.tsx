import { Factory, __fragment__ } from '../../index'
import { RenderProps } from './types'

function XObject({ schema: { properties } }: RenderProps) {
  return Object.keys(properties).reduce((result, key) => {
    const children = Factory({ schema: properties[key], index: key })
    if (Array.isArray(children)) result = result.concat(children)
    else result.push(children)
    return result
  }, [])
}

XObject[__fragment__] = true

export default XObject
