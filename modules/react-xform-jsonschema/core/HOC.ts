import React from 'react'

const __depth__ = Symbol('depth of schema definition')

export default function HOC(render: any) {
  return function ({ schema, index, children }) {
    return React.cloneElement(render({ schema, index, children }), {
      'data-depth': schema[__depth__],
      'data-index': index,
    })
  }
}

export { __depth__ }
