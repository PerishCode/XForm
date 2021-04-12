import { __render__ } from '@perish/react-xform'
import RenderCenter from './render'
import { Input } from '../_renders'

const compilerMap = new Map([
  [
    'object',
    async (schema, params) => {
      const { properties } = schema
      for (const key in properties)
        properties[key] = await compile(properties[key], params)
      schema[__render__].push(RenderCenter.get('XObject'))
      return schema
    },
  ],
  [
    'array',
    async (schema, params) => {
      schema.template = await compile(schema.template || {}, params)
      schema[__render__].push(RenderCenter.get('XArray'))
      return schema
    },
  ],
  [
    'string',
    schema => {
      schema[__render__].push(Input)
      return schema
    },
  ],
  ['default', schema => schema],
])

const CompilerCenter = {
  get(type: string) {
    return compilerMap.get(type) || compilerMap.get('default')
  },
  register() {},
}

async function compile(schema, params = {}) {
  if (schema['$ref']) {
    const response = await fetch(schema['$ref'])
    const json = await response.json()
    const result = Object.assign(json, schema)
    delete result['$ref']
    return compile(result)
  }

  schema[__render__] = []

  return CompilerCenter.get(schema.type)(schema, params)
}

export { compile, CompilerCenter }
