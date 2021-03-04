import {
  callbackStack,
  raw2callbackMap,
  raw2ListenerMap,
  raw2reaction,
} from './global'
import { Callback, Operation, __iterate__, __observed__ } from './types'

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

function observe(f: Function & { [__observed__]?: true }): Callback {
  const callback = (...args: any[]) => wrapAndReturn(callback, f, this, args)
  callback()
  return callback
}

function unobserve(callback: Callback) {
  callback.cleaners?.forEach(callbackSet => callbackSet.delete(callback))
}

function mountCallback(callback: Callback, { target, key }: Operation) {
  let callbackMap = raw2callbackMap.get(target)

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

function dealWithOperation(operation: Operation) {
  const { target, key } = operation
  const callbackMap = raw2callbackMap.get(target)
  const triggerSet = new Set<Callback>()

  if (key !== __iterate__)
    callbackMap?.get(key)?.forEach(c => triggerSet.add(c))
  if (target.constructor.prototype[key] === undefined)
    callbackMap?.get(__iterate__)?.forEach(c => triggerSet.add(c))

  triggerSet.forEach(c => c(operation))
}
