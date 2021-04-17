import { __render__ } from '@perish/react-xform'
import { TranspilerFactory } from '@perish/react-xform-jsonschema'
import { Input } from '../renders'

export default TranspilerFactory({
  injectors: [
    (schema, params) => {
      const { depth = 0 } = params
      schema['depth'] = depth
      params['depth'] = depth + 1
    },
  ],

  generators: [
    schema => {
      schema.type === 'string' && schema[__render__].push(Input)
    },
  ],
})
