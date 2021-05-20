import { __render__ } from '@x-form/react-jsonschema'
import renders from './renders'

const { Input, Select, Label, Options, Card } = renders

const DataComponent = {
  string: () => [Input],
}

const BoxComponent = {
  string: () => [Label],
  array: () => [Options, Card],
  object: () => [Card],
}

export default [
  (schema: any) => {
    if (schema.enum) {
      schema[__render__].push(Select)
    } else {
      const append = DataComponent[schema.type]
      append && (schema[__render__] = schema[__render__].concat(append()))
    }
  },

  (schema: any) => {
    BoxComponent[schema.type] &&
      schema[__render__].push(...BoxComponent[schema.type]())
  },
]
