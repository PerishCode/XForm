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
  schema => {
    if (schema.enum) {
      schema[__render__].push(Select)
    } else {
      DataComponent[schema.type] &&
        schema[__render__].push(...DataComponent[schema.type]())
    }
  },

  schema => {
    BoxComponent[schema.type] &&
      schema[__render__].push(...BoxComponent[schema.type]())
  },
]
