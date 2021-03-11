import {
  dealWithReadOperation,
  registerDependency,
  triggerCallbackOfOperation,
  ArrayPrototypeWrapperMap,
} from './engine'
import { raw2parent, raw2reaction, reaction2raw } from './global'
import { isDependencyFunction, isObject } from './utils'
import { reactive } from './index'
import { __iterate__ } from './types'

const baseHandlers: ProxyHandler<any> = {
  get(target, key, receiver) {
    let result = dealWithReadOperation({ target, key, receiver })
    if (ArrayPrototypeWrapperMap.has(result))
      return ArrayPrototypeWrapperMap.get(result)
    if (isDependencyFunction(result)) {
      registerDependency(result, { target, key })
      result = Reflect.get(target, key)
    }
    if (!isObject(result)) return result
    if (!raw2parent.has(result))
      raw2parent.set(result, raw2reaction.get(target))
    return raw2reaction.get(result) || reactive(result)
  },
  set(target, key, value) {
    if (isObject(value)) value = reaction2raw.get(value) || value

    const hasKey = Object.prototype.hasOwnProperty.call(target, key)
    const oldValue = Reflect.get(target, key)
    const result = Reflect.set(target, key, value)

    if (target.constructor.prototype[key] !== undefined)
      triggerCallbackOfOperation({ target, key, type: 'set' })
    else if (!hasKey) triggerCallbackOfOperation({ target, key, type: 'add' })
    else if (value !== oldValue)
      triggerCallbackOfOperation({ target, key, type: 'set' })

    return result
  },
  deleteProperty(target, key) {
    const hasKey = Object.prototype.hasOwnProperty.call(target, key)
    const result = Reflect.deleteProperty(target, key)
    if (hasKey) triggerCallbackOfOperation({ target, key, type: 'delete' })
    return result
  },
  ownKeys(target) {
    dealWithReadOperation({ target, key: __iterate__ })
    return Reflect.ownKeys(target)
  },
}

export default new Map<Function, object>([
  [Array, baseHandlers],
  [Object, baseHandlers],
])
