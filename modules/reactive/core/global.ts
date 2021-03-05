import { Key, Raw, Reaction, Callback, CallbackMap } from './types'

const KeyOfPrototypeFunctionWithEffect = new Set<Key>(['splice', 'copyWithin'])
const KeyOfIterateFunction = new Set<Key>([
  'forEach',
  'map',
  Symbol.iterator,
  'values',
  'keys',
  'every',
])

const raw2reaction = new WeakMap<Raw, Reaction>()
const reaction2raw = new WeakMap<Reaction, Raw>()

const raw2callbackMap = new WeakMap<Raw, CallbackMap>()
const raw2ListenerMap = new WeakMap<Raw, Map<Key, Callback>>()

const raw2parent = new WeakMap<Raw, Reaction>()
const raw2visited = new WeakMap<Raw, Set<Key>>()

const globalCallback = new Set<Callback>()
const callbackStack = new Array<Callback>()

export {
  KeyOfPrototypeFunctionWithEffect,
  KeyOfIterateFunction,
  raw2reaction,
  reaction2raw,
  raw2callbackMap,
  raw2ListenerMap,
  raw2parent,
  raw2visited,
  globalCallback,
  callbackStack,
}
