import { __render__ } from '@x-form/react-jsonschema'
import { Input, Label } from './basicRenders'

export default [
  (schema: any) => {
    const renders = schema[__render__]

    switch (schema.type) {
      case 'string': {
        renders.push(Input, Label)
        break
      }
    }
  },
]
