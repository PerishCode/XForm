import { combine } from '../utils'

const parser = {
  object: schema => {
    const { properties = {} } = schema
    let result = {}
    Object.keys(properties).forEach(k => (result[k] = extractor(properties[k])))
    return result
  },
  array: schema =>
    (schema.items || []).map(item => extractor(combine(schema.template, item))),
  number: schema => Number(schema.data),
  link: schema => schema.uid,
  default: schema => schema.data,
}

export default function extractor(schema) {
  const type = schema['type']
  const dataParser = parser[type] || parser['default']

  return type ? dataParser(schema) : schema
}
