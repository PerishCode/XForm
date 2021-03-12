import { isObject } from '@modules/reactive/dist/utils'

const parser = {
  object: (schema, formData) => {
    const { properties } = schema

    Object.keys(formData).forEach(key => {
      if (properties[key] === undefined) properties[key] = {}
      properties[key] = composer(properties[key], formData[key])
    })

    return schema
  },
  array: (schema, formData = []) => {
    const source = schema.items || []
    schema.items = formData.map((data, i) => composer(source[i] || {}, data))
    return schema
  },
  default: (schema, formData) => {
    schema.data = formData
    return schema
  },
} as any

export default function composer(schema, formData) {
  if (Array.isArray(formData)) return parser['array'](schema, formData)
  if (isObject(formData)) {
    if (schema.properties === undefined) schema.properties = {}
    return parser['object'](schema, formData)
  }
  schema['data'] = formData
  return schema
}
