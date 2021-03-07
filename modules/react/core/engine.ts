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
    }

    return actualRender[__fragment__]
      ? render(props)
      : React.createElement(render, props, unit)
  }, null)
}

export { Factory }
