import { combine } from '../utils'

const extractorMap = new Map([
  [
    'object',
    ({ properties = {} }) =>
      Object.keys(properties).reduce((result, key) => {
        result[key] = extract(properties[key])
        return result
      }, {}),
  ],
  [
    'array',
    schema =>
      (schema.items || []).map(item => extract(combine(schema.template, item))),
  ],
  ['number', schema => Number(schema.data)],
  ['link', schema => schema.uid],
  ['default', schema => schema.data],
])

function extract(schema) {
  const { type } = schema
  return type && (extractorMap.get(type) || extractorMap.get('default'))(schema)
}

export { extractorMap, extract }
