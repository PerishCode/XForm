import { __render__ } from '@perish/react-xform'
import { renderMap } from './render'

const compilerMap = new Map([
  [
    'object',
    async schema => {
      const { properties } = schema
      for (const key in properties)
        properties[key] = await compile(properties[key])
      schema[__render__] = [renderMap.get('XObject')]
      return schema
    },
  ],
  [
    'array',
    async schema => {
      schema.template = await compile(schema.template || {})
      schema[__render__] = [renderMap.get('XArray')]
      return schema
    },
  ],
  ['default', schema => schema],
])

const Hooks = {
  afterCompile: [],
  beforeCompile: [],
}

async function compile(schema, params = {}) {
  if (schema['$ref']) {
    const response = await fetch(schema['$ref'])
    const json = await response.json()
    const result = Object.assign(json, schema)
    delete result['$ref']
    return compile(result)
  }

  Hooks.beforeCompile.forEach(callback => callback(schema, params))
  const middleResult = (
    compilerMap.get(schema.type) || compilerMap.get('default')
  )(schema)
  Hooks.afterCompile.forEach(callback => callback(middleResult, params))

  return middleResult
}

export { compile, compilerMap, Hooks }
