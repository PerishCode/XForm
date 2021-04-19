import { __depth__ } from './HOC'

export default [
  (schema, params) => {
    const depth = params[__depth__] ?? 0
    schema[__depth__] = depth
    params[__depth__] = depth + 1
  },
]
