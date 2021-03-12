import { __render__, wrapAsDependency as $, combine } from '@perish/react-xform'
import {
  Info,
  Input,
  Card,
  XObject,
  XArray,
  Validator,
  Label,
  Table,
} from './renders'
import validatorRules from './renders/Validator/parser'

const defaultRender = {
  object: () => [XObject],
  array: () => [XArray],
  string: () => [Input],
  number: () => [Input],
  info: () => [Info],
  none: () => [],
}

const containerMap = {
  Card: Card,
  Validator: Validator,
  Label: Label,
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
    if (schema.mode === 'table') schema[__render__].push(Table)
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
  schema[__render__] = (defaultRender[type] || defaultRender['none'])()

  if (schema['containers'])
    schema['containers'].forEach((container: any) => {
      if (typeof container === 'string')
        schema[__render__].push(containerMap[container])
      else
        schema[__render__].push({
          ...container,
          type: containerMap[container.type],
        })
    })
  else {
    if (schema['title'])
      schema[__render__].push(type === 'object' ? Card : Label)

    const rules = {} as any
    Object.keys(schema).forEach(key => {
      if (validatorRules[key] !== undefined) rules[key] = schema[key]
    })

    if (Object.keys(rules).length) {
      rules.type = Validator
      schema[__render__].push(rules)
    }
  }

  return (parser[type] || parser['default'])(schema)
}

export default transformer
