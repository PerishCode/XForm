import { __render__ } from '@perish/react-xform'
import XObject from './XObject'
import XArray from './XArray'

export default function TranspilerFactory(
  Hooks = {
    injectors: [],
    generators: [],
  },
  extensions = {}
) {
  const transpilerMap = {
    async object(schema, params) {
      const { properties } = schema
      for (const key in properties)
        properties[key] = await transpile(properties[key], params)
      schema[__render__].push(XObject)
    },
    async array(schema, params) {
      schema.template = await transpile(schema.template || {}, params)
      schema[__render__].push(XArray)
    },
    ...extensions,
  }

  async function transpile(schema, params = {}) {
    if (schema['$ref']) {
      const response = await fetch(schema['$ref'])
      const json = await response.json()
      const result = Object.assign(json, schema)
      delete result['$ref']
      return transpile(result, params)
    }

    if (schema.type) {
      schema[__render__] = []
      const transpile = transpilerMap[schema.type]
      Hooks.injectors.forEach(injector => injector(schema, params))
      transpile && (await transpile(schema, params))
      Hooks.generators.forEach(generator => generator(schema))
    }

    return schema
  }

  return transpile
}
