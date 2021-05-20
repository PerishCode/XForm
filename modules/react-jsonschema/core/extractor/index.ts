import { combine } from '../global'
import { Schema } from '../types'

interface Extractor {
  (schema: Schema): any
}

interface ExtractorMap {
  [key: string]: Extractor
}

export default function ExtractorFactory(extensions: ExtractorMap = {}) {
  const extractorMap: ExtractorMap = {
    ...extensions,
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

  function extract(schema: Schema) {
    const { type } = schema
    return type && (extractorMap[type] || extractorMap['default'])(schema)
  }

  return extract
}
