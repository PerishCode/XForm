import { __render__ } from '@perish/react-xform'
import { reactive } from '@perish/reactive'
import { reaction2raw } from '@perish/reactive/dist/global'

function isObject(source) {
  return source !== null && typeof source === 'object'
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

export { isObject, combine }
