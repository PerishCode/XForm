import { isObject, combine } from '../utils'

const parserMap = {
  object: (schema, formData) => {
    const { properties } = schema

    Object.keys(formData).forEach(key => {
      composer(properties[key], formData[key])
    })

    // return schema
  },
  array: (schema, formData = []) =>
    (schema.items = formData.map(data => {
      const auxiliary = {}
      const combination = combine(schema.template, auxiliary)
      composer(combination, data)
      return auxiliary
    })),
  link: (schema, formData) => (schema['uid'] = formData),
  default: (schema, formData) => (schema['data'] = formData),
} as any

export default function composer(schema, formData) {
  const parser = parserMap[schema.type] || parserMap['default']
  parser(schema, formData)
  return schema
}
