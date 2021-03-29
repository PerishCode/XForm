import { combine } from './utils'

const processorMap = {
  object: ({ properties = {} }) =>
    Object.keys(properties).reduce((result, key) => {
      result[key] = extractor(properties[key])
      return result
    }, {}),
  array: schema =>
    (schema.items || []).map(item => extractor(combine(schema.template, item))),
  number: schema => Number(schema.data),
  link: schema => schema.uid,
  default: schema => schema.data,
}

export default function extractor(schema) {
  const type = schema['type']
  const processor = processorMap[type] || processorMap['default']
  return type ? processor(schema) : schema
}
