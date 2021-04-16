import { Factory, __render__, __fragment__ } from '@perish/react-xform'
import { combine } from './utils'

/* 核心渲染方法 */
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
/* ----------- */

const transpilerMap = {
  async object(schema) {
    const { properties } = schema
    for (const key in properties)
      properties[key] = await transpile(properties[key])
    schema[__render__] = [XObject]
    return schema
  },
  async array(schema) {
    schema.template = await transpile(schema.template || {})
    schema[__render__] = [XArray]
    return schema
  },
  async default(schema) {
    schema[__render__] = []
    return schema
  },
}

async function transpile(schema) {
  if (schema['$ref']) {
    const response = await fetch(schema['$ref'])
    const json = await response.json()
    const result = Object.assign(json, schema)
    delete result['$ref']
    return transpile(result)
  }

  return (transpilerMap[schema.type] || transpilerMap['default'])(schema)
}

export { transpile }
