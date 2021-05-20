import { Schema } from '../types'
import { combine } from '../global'

interface Composer {
  (schema: Schema, data: any): any
}

interface ComposerMap {
  [key: string]: Composer
}

export default function ComposerFactory(extensions: ComposerMap = {}) {
  const composerMap: ComposerMap = {
    ...extensions,
    object(schema, data) {
      const { properties } = schema
      Object.keys(data ?? {}).forEach(key =>
        compose(properties[key], data[key])
      )
      return schema
    },
    array(schema, data) {
      schema.items = (data ?? []).map((itemData: any) =>
        compose(combine(schema.template, {}), itemData)
      )
      return schema
    },
    default(schema, data) {
      schema['data'] = data
      return schema
    },
  }

  function compose(schema: Schema, data: unknown) {
    return (composerMap[schema.type] || composerMap['default'])(schema, data)
  }

  return compose
}
