import { __depth__ } from './renders'

export default [
  (schema, params) => {
    let depth = params[__depth__] ?? 0
    schema[__depth__] = depth

    return {
      ...params,
      [__depth__]: depth + 1,
    }
  },
]
