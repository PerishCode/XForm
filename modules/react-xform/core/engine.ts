import React from 'react'
import { __fragment__, __render__, __withHooks__ } from './global'
import { FactoryProps } from './types'

function Factory({ schema, index }: FactoryProps): any {
  return (schema[__render__] || []).reduce((unit, render: any) => {
    const actualRender = typeof render === 'function' ? render : render.type
    const props = {
      schema: schema,
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
