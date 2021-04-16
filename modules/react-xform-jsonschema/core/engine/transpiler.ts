import { createElement as h } from 'react'
import {
  Factory,
  __render__,
  __fragment__,
  aggregatedOperation as Do,
} from '@perish/react-xform'
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

function Input({ schema }) {
  return h('input', {
    value: schema.data || '',
    onChange: (e: any) =>
      Do(() => {
        schema.data = e.target.value
      }),
  })
}

XArray[__fragment__] = true
XObject[__fragment__] = true
/* ----------- */

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
}

const Hooks = {
  injectors: [
    function useDepth(schema, params) {
      const { depth = 0 } = params
      schema['depth'] = depth
      params['depth'] = depth + 1
    },
  ],

  generators: [
    function useCustomize(schema) {
      schema.type === 'string' && schema[__render__].push(Input)
    },
  ],
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
    const transpiler = transpilerMap[schema.type]
    Hooks.injectors.forEach(injector => injector(schema, params))
    transpiler && (await transpiler(schema, params))
    Hooks.generators.forEach(generator => generator(schema))
  }

  return schema
}

export { transpile }
