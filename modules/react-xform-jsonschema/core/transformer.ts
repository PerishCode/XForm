import { __render__ } from '@perish/react-xform'
import HOC, { __depth__ } from './HOC'
import {
  XArray,
  XObject,
  Input,
  Card as BasicCard,
  Label as BasicLabel,
} from './renders'

const Card = HOC(BasicCard)
const Label = HOC(BasicLabel)

const renderMap = {
  object: () => [XObject, Card],
  array: () => [XArray, Card],
  string: () => [Input, Label],
  default: () => [],
}

const processorMap = {
  object: async schema => {
    const { properties } = schema
    for (const key in properties)
      properties[key] = await transformer(properties[key], {
        depth: schema[__depth__] + 1,
      })
    return schema
  },
  array: async schema => {
    schema.template = await transformer(schema.template || {}, {
      depth: schema[__depth__] + 1,
    })
    return schema
  },
  default: schema => schema,
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
