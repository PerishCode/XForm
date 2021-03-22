import { __render__ } from '@perish/react-xform'
import Rules from '@/renders/Validator'

const renderMap = {
  object: () => [],
  string: () => [],
  none: () => [],
}

const parser = {
  object: async () => {},
  default: (schema, depth) => {},
}

async function transformer(schema, depth = 0, readOnly = false) {
  if (schema['$ref']) {
    const response = await fetch(schema['$ref'])
    const json = await response.json()
    const result = Object.assign(json, schema)
    delete result['$ref']
    return transformer(result, depth, readOnly)
  }

  if (schema['type'] === undefined) return schema

  schema[__render__] = (renderMap[schema['type']] || renderMap['none'])()

  //   Object.keys(schema).forEach(key => {
  //       if(Rules[key] === undefined) return

  //       schema[__render__].push()
  //   })
}
