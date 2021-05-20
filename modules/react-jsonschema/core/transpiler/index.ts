import { __render__ } from '@x-form/react'
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
    async object(schema: any, params: any) {
      const { properties } = schema
      for (const key in properties)
        properties[key] = await transpile(properties[key], params)
      schema[__render__].push(XObject)
    },
    async array(schema: any, params: any) {
      schema.template = await transpile(schema.template || {}, params)
      schema[__render__].push(XArray)
    },
    ...extensions,
  }

  async function transpile(schema: any = {}, params = {}) {
    // $ref 属性暂时废弃
    //
    // if (schema['$ref']) {
    //   const response = await fetch(schema['$ref'])
    //   const json = await response.json()
    //   const result = Object.assign(json, schema)
    //   delete result['$ref']
    //   return transpile(result, params)
    // }

    if (schema.type) {
      // 初始化渲染函数数组
      schema[__render__] = []

      // 注入额外参数
      params = Hooks.injectors.reduce(
        (previous, injector) => injector(schema, previous),
        params
      )

      // 选择基本转译器
      const transpile = transpilerMap[schema.type]
      transpile && (await transpile(schema, params))

      // 补充渲染函数
      Hooks.generators.forEach(generator => generator(schema))
    }

    return schema
  }

  return transpile
}
