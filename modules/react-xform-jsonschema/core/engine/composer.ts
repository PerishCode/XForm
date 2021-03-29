import { combine } from '../utils'

const composerMap = new Map([
  [
    'object',
    (schema, data = {}) => {
      const { properties } = schema
      Object.keys(data).forEach(key => compose(properties[key], data[key]))
      return schema
    },
  ],
  [
    'array',
    (schema, data = []) => {
      schema.items = data.map(itemData =>
        compose(combine(schema.template, {}), itemData)
      )
      return schema
    },
  ],
  [
    'default',
    (schema, data) => {
      schema['data'] = data
      return schema
    },
  ],
])

function compose(schema, data) {
  return (composerMap.get(schema.type) || composerMap.get('default'))(
    schema,
    data
  )
}

export { composerMap, compose }
