import React from 'react'
import { __fragment__ } from '@perish/react-xform'

const __depth__ = Symbol('depth of schema fragment')

export default function HOC(render: any) {
  return render[__fragment__]
    ? render
    : function ({ schema, index, children }) {
        const extraProps = {
          'data-depth': schema[__depth__] || 0,
        }

        if (typeof index === 'string') extraProps['data-index'] = index

        return React.cloneElement(
          render({ schema, index, children }),
          extraProps
        )
      }
}

export { __depth__ }
