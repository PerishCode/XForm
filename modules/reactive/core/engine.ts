import {
  callbackStack,
  easyCallback,
  raw2callbackMap,
  raw2ListenerMap,
  raw2parent,
  raw2reaction,
  raw2visited,
  reaction2raw,
} from './global'
import {
  Callback,
  Operation,
  Reaction,
  __iterate__,
  __observed__,
} from './types'
import { isIterateFunction, isObject } from './utils'

let enableIterateCallback = true

function wrapAndReturn(
  callback: Callback,
  f: Function,
  context: any,
  args: any[]
) {
  if (callback[__observed__]) return Reflect.apply(f, context, args)
  if (callbackStack.includes(callback)) return

  callbackStack.push(callback)
  const result = Reflect.apply(f, context, args)
  callback[__observed__] = true
  callbackStack.pop()

  return result
}

function observe(f: Function): Callback {
  const callback = (...args: any[]) => wrapAndReturn(callback, f, this, args)
  callback()
  return callback
}

function unobserve(callback: Callback) {
  callback.cleaners?.forEach(callbackSet => callbackSet.delete(callback))
}

function observeEasy(f: Function) {
  easyCallback.add(f)
}

function unobserveEasy(f: Function) {
  easyCallback.delete(f)
}

function aggregatedOperation(f: Function) {
  f()
  easyCallback.forEach(c => c())
}

function mountCallback(callback: Callback, { target, key }: Operation) {
  let callbackMap = raw2callbackMap.get(target)

  // console.log('mounting', key)

  if (callbackMap === undefined) {
    callbackMap = new Map()
    raw2callbackMap.set(target, callbackMap)
  }

  let callbackSet = callbackMap.get(key)
  if (callback.cleaners === undefined) callback.cleaners = []

  if (!callbackSet) {
    callbackSet = new Set()
    callbackMap.set(key, callbackSet)
  }

  if (!callbackSet.has(callback)) {
    callbackSet.add(callback)
    callback.cleaners.push(callbackSet)
  }
}

function registerDependency(f: Function, { target, key }: Operation) {
  const copy = f.bind(null)
  const reaction = raw2reaction.get(target)

  let listernerMap = raw2ListenerMap.get(target)
  if (listernerMap === undefined) {
    listernerMap = new Map()
    raw2ListenerMap.set(target, listernerMap)
  }

  const oldDependency = listernerMap.get(key)
  if (oldDependency) unobserve(oldDependency)

  listernerMap.set(
    key,
    observe((operation: Operation) => {
      Reflect.set(reaction, key, copy(reaction, operation))
    })
  )
}

function triggerCallbackOfOperation(operation: Operation) {
  const { target, key } = operation

  const callbackMap = raw2callbackMap.get(target)
  const triggerSet = new Set<Callback>()

  if (key !== __iterate__)
    callbackMap?.get(key)?.forEach(c => triggerSet.add(c))
  if (
    target.constructor.prototype[key] === undefined &&
    enableIterateCallback
  ) {
    callbackMap?.get(__iterate__)?.forEach(c => triggerSet.add(c))
  }

  // if (triggerSet.size) console.log('triggering', key)

  triggerSet.forEach(c => c(operation))
}

function dealWithReadOperation({ target, key }: Operation) {
  if (key === '$') return raw2parent.get(target)
  if (callbackStack.length === 0) return target[key]

  const callback = callbackStack[callbackStack.length - 1]
  const visited = raw2visited.get(target)

  if (isIterateFunction(target, key)) {
    raw2visited.set(target, new Set(Object.keys(target)))
  } else if (visited) {
    visited.delete(key)
    if (visited.size === 0) {
      raw2visited.delete(target)
      mountCallback(callback, { target, key: __iterate__ })
    }
  } else {
    mountCallback(callback, { target, key })
  }

  return Reflect.get(target, key)
}

function combine(source: Reaction, auxiliary: Reaction) {
  if (!isObject(source) || !isObject(auxiliary)) return source

  const raw = reaction2raw.get(source)
  return new Proxy<any>(
    {},
    {
      get(_, key) {
        return source[key] !== undefined
          ? combine(source[key], auxiliary[key])
          : auxiliary[key]
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

const ArrayPrototypeWrapperMap = new Map<Function, Function>([
  [
    Array.prototype.splice,
    function _splice(...args: any[]) {
      enableIterateCallback = false
      const result = Array.prototype.splice.apply(this, args)
      enableIterateCallback = true
      triggerCallbackOfOperation({
        target: reaction2raw.get(this),
        key: __iterate__,
      })
      return result
    },
  ],
  [
    Array.prototype.push,
    function _push(...args: any[]) {
      enableIterateCallback = false
      const result = Array.prototype.push.apply(this, args)
      enableIterateCallback = true
      triggerCallbackOfOperation({
        target: reaction2raw.get(this),
        key: __iterate__,
      })
      return result
    },
  ],
  [
    Array.prototype.pop,
    function _pop(...args: any[]) {
      enableIterateCallback = false
      const result = Array.prototype.pop.apply(this, args)
      enableIterateCallback = true
      triggerCallbackOfOperation({
        target: reaction2raw.get(this),
        key: __iterate__,
      })
      return result
    },
  ],
  [
    Array.prototype.shift,
    function _shift(...args: any[]) {
      enableIterateCallback = false
      const result = Array.prototype.shift.apply(this, args)
      enableIterateCallback = true
      triggerCallbackOfOperation({
        target: reaction2raw.get(this),
        key: __iterate__,
      })
      return result
    },
  ],
  [
    Array.prototype.unshift,
    function _unshift(...args: any[]) {
      enableIterateCallback = false
      const result = Array.prototype.unshift.apply(this, args)
      enableIterateCallback = true
      triggerCallbackOfOperation({
        target: reaction2raw.get(this),
        key: __iterate__,
      })
      return result
    },
  ],
])

export {
  registerDependency,
  dealWithReadOperation,
  triggerCallbackOfOperation,
  combine,
  observe,
  unobserve,
  observeEasy,
  unobserveEasy,
  aggregatedOperation,
  ArrayPrototypeWrapperMap,
}
