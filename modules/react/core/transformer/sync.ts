import { __render__, wrapAsDependency as $ } from '..'
import { Info, Input, XObject, XArray } from './render'

const defaultRender = {
  object: XObject,
  array: XArray,
  string: Input,
  number: Input,
  info: Info,
} as any

const parser = {
  object: (schema: any) => {
    const { properties } = schema
    Object.keys(properties).forEach(
      k => (properties[k] = transformer(properties[k]))
    )
    return schema
  },
  array: (schema: any) => {
    schema.template = transformer(schema.template)
    return schema
  },
  default: (schema: any) => schema,
} as any

export default function transformer(schema: any) {
  if (schema['type'] === undefined) return schema

  const type = schema['type']
  schema[__render__] = [defaultRender[type]]
  return (parser[type] || parser['default'])(schema)
}
