const symbols = {
  ref: '$ref',
}

export function split(initialSchema: any, uid: string = '') {
  if (initialSchema === null || initialSchema === undefined)
    return initialSchema

  const countRef = { current: 0 }
  const definitions = {}

  const handlers = {
    object(schema: any) {
      const { properties } = schema
      Object.keys(properties).forEach(
        key => (properties[key] = recursive(properties[key]))
      )
      return schema
    },
    array(schema: any) {
      const { type } = schema.template

      if (type === 'object' || type === 'array')
        schema.template = {
          type: 'embedded',
          [symbols.ref]: registerDefinition(recursive(schema.template)),
        }

      return schema
    },
    default(schema: any) {
      return schema
    },
  }

  const recursive = (schema: any) =>
    (handlers[schema.type] || handlers['default'])(schema)

  function registerDefinition(definition: any) {
    const key = uid + '$' + countRef.current++
    definitions[key] = definition
    return key
  }

  return { schema: recursive(initialSchema), definitions }
}

export function compose({ schema: initialSchema, definitions }: any) {
  const handlers = {
    object(schema: any) {
      const { properties } = schema
      Object.keys(properties).forEach(
        key => (properties[key] = recursive(properties[key]))
      )
      return schema
    },
    array(schema: any) {
      schema.template = recursive(schema.template)
      return schema
    },
    embedded(schema: any) {
      const ref = schema[symbols.ref]
      const result = JSON.parse(JSON.stringify(definitions[ref]))
      return recursive(result)
    },
    default(schema: any) {
      return schema
    },
  }

  function recursive(schema: any) {
    return (handlers[schema.type] || handlers['default'])(schema)
  }

  return recursive(initialSchema)
}
