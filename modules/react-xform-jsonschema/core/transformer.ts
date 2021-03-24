import { __render__ } from '@perish/react-xform'
import { XArray, XObject, Validator, Input } from './renders'

const renderMap = {
  object: () => [XObject],
  array: () => [XArray],
  string: () => [Input, Validator],
  default: () => [],
}

const processorMap = {
  object: async schema => {
    const { properties } = schema
    for (const key in properties)
      properties[key] = await transformer(properties[key])
    return schema
  },
  array: async schema => {
    schema.template = await transformer(schema.template || {})
    return schema
  },
  default: schema => schema,
}

async function transformer(schema) {
  if (schema['$ref']) {
    const response = await fetch(schema['$ref'])
    const json = await response.json()
    const result = Object.assign(json, schema)
    delete result['$ref']
    return transformer(result)
  }

  if (schema['type'] === undefined) return schema

  const type = schema['type']
  const render = renderMap[type] || renderMap['default']
  const processor = processorMap[type] || processorMap['default']

  schema[__render__] = render()
  return processor(schema)
}

export default transformer
