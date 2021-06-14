import { __render__ } from '@x-form/react'
import XObject from './XObject'
import XArray from './XArray'

export default function TranspilerFactory({
  propsInjectors = [],
  renderGenerators = [],
  typeExtensions = {},
}) {
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
    ...typeExtensions,
  }

  async function transpile(schema: any = {}, params = {}) {
    if (schema.type) {
      // 初始化渲染函数数组
      schema[__render__] = []

      // 注入额外参数
      params = propsInjectors.reduce(
        (previous, injector) => injector(schema, previous),
        params
      )

      // 通过类型获取转译器
      const transpile = transpilerMap[schema.type]

      // 调用转译器
      transpile && (await transpile(schema, params))

      // 补充渲染函数
      renderGenerators.forEach(generator => generator(schema))
    }

    return schema
  }

  return transpile
}
