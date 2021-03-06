import React from 'react'
import { combine } from '@xform/reactive'
import { __render__, __withHooks__ } from './global'
import { FactoryProps } from './types'

function Factory({ schema, index, addition }: FactoryProps): any {
  const combination = combine(schema, addition)
  const renders: any[] = combination[__render__] || []

  return renders.reduce(
    (unit, render) =>
      render[__withHooks__]
        ? React.createElement(
            render,
            { schema: combination, index, key: index as any },
            unit
          )
        : render({ schema: combination, index, key: index as any }),
    null
  )
}

export { Factory }
