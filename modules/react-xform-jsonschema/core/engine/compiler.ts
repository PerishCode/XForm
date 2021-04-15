import { __render__ } from '@perish/react-xform'
import { XArray, XObject } from './render'

/**
 * 复杂类型 schema 定义处理方法
 */
const defaultCompilerMap = {
  async object(schema) {
    const { properties } = schema
    for (const key in properties)
      properties[key] = await compile(properties[key])
    schema[__render__] = [XObject]
    return schema
  },
  async array(schema) {
    schema.template = await compile(schema.template || {})
    schema[__render__] = [XArray]
    return schema
  },
  async default(schema) {
    schema[__render__] = []
    return schema
  },
}

/**
 * render 生成方法
 */
const renderGeneratorMap = {}

async function compile(schema) {
  if (schema['$ref']) {
    const response = await fetch(schema['$ref'])
    const json = await response.json()
    const result = Object.assign(json, schema)
    delete result['$ref']
    return compile(result)
  }

  return (defaultCompilerMap[schema.type] || defaultCompilerMap['default'])(
    schema
  )
}

export { compile }
