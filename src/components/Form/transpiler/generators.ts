import { __render__ } from '@x-form/react-jsonschema'
import renders, { __depth__ } from './antd'

const { Input, Select, Label, Options, Card } = renders

export default [
  (schema: any) => {
    if (schema.enum) schema[__render__].push(Select)
    else if (schema.type === 'string') schema[__render__].push(Input)
  },

  (schema: any) => {
    switch (schema.type) {
      case 'string': {
        schema[__render__].push(Label)
        break
      }

      case 'object': {
        if (schema[__depth__] === 0) schema[__render__].push(Card)
        break
      }

      case 'array': {
        schema[__render__].push(Options)
        if (schema[__depth__] === 0) schema[__render__].push(Card)
        break
      }
    }
  },
]
