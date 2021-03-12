import { combine } from '@perish/react-xform'

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
  default: schema => schema.data,
}

export default function extractor(schema) {
  if (schema['type'] === undefined) return schema
  const type = schema['type']
  return (parser[type] || parser['default'])(schema)
}
