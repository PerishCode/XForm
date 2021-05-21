import { __depth__ } from './antd'

export default [
  (schema: any, params: any) =>
    Object.assign(params, {
      [__depth__]: (schema[__depth__] = params[__depth__] ?? 0) + 1,
    }),
]
