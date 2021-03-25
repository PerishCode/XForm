import { combine } from './utils'

const processorMap = {
  object: ({ properties }, formData = {}) => {
    Object.keys(formData).forEach(key =>
      composer(properties[key], formData[key])
    )
  },
  array: (schema, formData = []) => {
    schema.items = formData.map(data =>
      composer(combine(schema.template, {}), data)
    )
  },
  link: (schema, formData) => {
    schema['uid'] = formData
  },
  default: (schema, formData) => {
    schema['data'] = formData
  },
} as any

export default function composer(schema, formData) {
  if (schema === undefined) debugger
  const processor = processorMap[schema.type] || processorMap['default']
  processor(schema, formData)
  return schema
}
