import React from 'react'
import { reaction2raw } from '@perish/reactive/dist/global'
import { isObject } from '@perish/reactive/dist/utils'
import { __fragment__, __render__, __withHooks__ } from './global'
import { FactoryProps } from './types'
import { reactive } from '@perish/reactive'

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

function combine(source: any, auxiliary: any): any {
  if (!isObject(source) || !isObject(auxiliary)) return source

  source = reactive(source)
  auxiliary = reactive(auxiliary)

  const raw = reaction2raw.get(source) as any

  return new Proxy<any>(
    {},
    {
      get(_, key) {
        const initial = source[key]
        if (initial === undefined) return auxiliary[key]
        if (!isObject(initial) || key === __render__) return initial
        if (auxiliary[key] === undefined) auxiliary[key] = {}
        return combine(initial, auxiliary[key])
      },
      set(_, key, value) {
        return Reflect.get(raw, key) === undefined
          ? Reflect.set(auxiliary, key, value)
          : Reflect.set(source, key, value)
      },
      ownKeys() {
        return Reflect.ownKeys(source)
      },
      getOwnPropertyDescriptor(_, key) {
        return {
          configurable: true,
          enumerable: raw.constructor.prototype[key] === undefined,
        }
      },
    }
  )
}

export { Factory, combine }
