import { __render__ } from '@perish/react-xform'
import { XArray, XObject, Input, Card, Label } from './renders'
import { __depth__ } from './HOC'

const renderMap = {
  object: () => [XObject],
  array: () => [XArray],
  string: () => [Input],
  default: () => [],
}

const processorMap = {
  object: async schema => {
    const { properties } = schema

    for (const key in properties)
      properties[key] = await transformer(properties[key], {
        depth: schema[__depth__] + 1,
      })

    schema.title && schema[__render__].push(Card)
    return schema
  },
  array: async schema => {
    schema.template = await transformer(schema.template || {}, {
      depth: schema[__depth__] + 1,
    })

    schema.title && schema[__render__].push(Card)
    return schema
  },
  default: schema => {
    schema.title && schema[__render__].push(Label)
    return schema
  },
}

async function transformer(schema: any, params: any = {}) {
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

  const { depth = 0 } = params

  schema[__depth__] = depth
  schema[__render__] = render()
  return processor(schema)
}

export default transformer
