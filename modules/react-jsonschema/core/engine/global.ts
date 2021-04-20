import { __render__ } from '@x-form/react'
import { reactive, getRaw } from '@x-form/model'
type Schema = any

interface Extractor {
  (schema: Schema): any
}

interface ExtractorMap {
  [key: string]: Extractor
}

function isObject(source) {
  return source !== null && typeof source === 'object'
}

function combine(source: any, auxiliary: any): any {
  if (!isObject(source) || !isObject(auxiliary)) return source

  source = reactive(source)
  auxiliary = reactive(auxiliary)

  const raw = getRaw(source)

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

export { combine, Schema, ExtractorMap }
