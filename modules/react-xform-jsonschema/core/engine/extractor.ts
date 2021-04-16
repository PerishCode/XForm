import { combine } from './utils'

const extractorMap = {
  object: ({ properties = {} }) =>
    Object.keys(properties).reduce((result, key) => {
      result[key] = extract(properties[key])
      return result
    }, {}),
  array: schema =>
    (schema.items || []).map(item => extract(combine(schema.template, item))),
  number: schema => Number(schema.data),
  default: schema => schema.data,
}

function extract(schema) {
  const { type } = schema
  return type && (extractorMap[type] || extractorMap['default'])(schema)
}

export { extract }
