import { cloneElement } from 'react'
import { __fragment__ } from '@x-form/react'

const __depth__ = Symbol('data item depth')

export { __depth__ }

export default function HOC(render) {
  return render[__fragment__]
    ? render
    : ({ schema, index, children }) =>
        cloneElement(render({ schema, index, children }), {
          'hoc-index': index,
          'hoc-depth': schema[__depth__],
        })
}
