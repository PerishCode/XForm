import { __render__ } from '@perish/react-xform'
import { XArray, XObject, Input } from './renders'
import Rules from './renders/Validator'

const renderMap = {
  object: () => [XObject],
  array: () => [XArray],
  string: () => [Input],
  default: () => [],
}

const parser = {
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

  const renderGenerator = renderMap[type] || renderMap['default']
  const schemaParser = parser[type] || parser['default']

  schema[__render__] = renderGenerator()
  return schemaParser(schema)
}

export default transformer
