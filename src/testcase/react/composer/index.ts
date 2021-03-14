import { combine } from '@perish/react-xform'
import { isObject } from '@perish/reactive/dist/utils'

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
    schema.items = formData.map((data, i) =>
      composer(combine(schema.template, source[i] || {}), data),
    )
    return schema
  },
} as any

export default function composer(schema, formData) {
  if (schema.type === 'link') {
    console.log(schema)
    schema['uid'] = formData
    return schema
  }
  if (Array.isArray(formData)) return parser['array'](schema, formData)
  if (isObject(formData)) {
    if (schema.properties === undefined) schema.properties = {}
    return parser['object'](schema, formData)
  }

  schema['data'] = formData
  return schema
}
