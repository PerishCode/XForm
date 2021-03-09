import React from 'react'
import { combine } from '@xform/reactive'
import { __fragment__, __render__, __withHooks__ } from './global'
import { FactoryProps } from './types'

function Factory({ schema, index, addition }: FactoryProps): any {
  const combination = combine(schema, addition)
  const renders: any[] = combination[__render__] || []

  return renders.reduce((unit, render) => {
    const actualRender = typeof render === 'function' ? render : render.type
    const props = {
      schema: combination,
      index,
      key: index as any,
      configuration: typeof render === 'function' ? {} : render,
      children: unit,
    }

    return actualRender[__fragment__]
      ? actualRender(props)
      : React.createElement(actualRender, props, unit)
  }, null)
}

export { Factory }
