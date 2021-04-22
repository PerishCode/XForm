import { combine, Schema } from './global'

export default function ComposerFactory(extensions = {}) {
  const composerMap = {
    object(schema: Schema, data) {
      const { properties } = schema
      Object.keys(data ?? {}).forEach(key =>
        compose(properties[key], data[key])
      )
      return schema
    },
    array(schema: Schema, data) {
      schema.items = (data ?? []).map(itemData =>
        compose(combine(schema.template, {}), itemData)
      )
      return schema
    },
    default(schema: Schema, data: any) {
      schema['data'] = data
      return schema
    },
    ...extensions,
  }

  function compose(schema: Schema, data: unknown) {
    return (composerMap[schema.type] || composerMap['default'])(schema, data)
  }

  return compose
}
