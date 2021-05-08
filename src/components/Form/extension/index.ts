const symbols = {
  ref: '$ref',
}

export function split(initialSchema: any, uid: string = '') {
  if (initialSchema === null || initialSchema === undefined)
    return initialSchema

  const countRef = { current: 0 }
  const definitions = {}

  const handlers = {
    object(schema) {
      const { properties } = schema
      Object.keys(properties).forEach(
        key => (properties[key] = recursive(properties[key]))
      )
      return schema
    },
    array(schema) {
      const { type } = schema.template

      if (type !== 'object' || type !== 'array') {
        const result = recursive(schema.template)
        schema.template = {
          type: 'embedded',
          [symbols.ref]: insertDefinition(result),
        }
      }

      return schema
    },
    default(schema) {
      return schema
    },
  }

  const recursive = (schema: any) =>
    (handlers[schema.type] || handlers['default'])(schema)

  function insertDefinition(definition: any) {
    const key = uid + '$' + countRef.current++
    definitions[key] = definition
    return key
  }

  return { schema: recursive(initialSchema), definitions }
}

export function compose({ schema: initialSchema, definitions }: any) {
  const handlers = {
    object(schema) {
      const { properties } = schema
      Object.keys(properties).forEach(
        key => (properties[key] = recursive(properties[key]))
      )
      return schema
    },
    array(schema) {
      schema.template = recursive(schema.template)
      return schema
    },
    embedded(schema) {
      const ref = schema[symbols.ref]
      const result = JSON.parse(JSON.stringify(definitions[ref]))
      return recursive(result)
    },
    default(schema) {
      return schema
    },
  }

  const recursive = (schema: any) =>
    (handlers[schema.type] || handlers['default'])(schema)

  return recursive(initialSchema)
}
