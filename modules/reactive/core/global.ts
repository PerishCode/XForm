import { Key, Raw, Reaction, Callback, CallbackMap } from './types'

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
const easyCallback = new Set<Callback>()

const raw2visited = new WeakMap<Raw, Set<Key>>()
const callbackStack = new Array<Callback>()

export {
  KeyOfIterateFunction,
  raw2reaction,
  reaction2raw,
  raw2callbackMap,
  raw2ListenerMap,
  raw2parent,
  raw2visited,
  easyCallback,
  callbackStack,
}
