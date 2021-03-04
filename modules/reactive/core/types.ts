const __dependency__ = Symbol('data item dependency function')
const __observed__ = Symbol('function has been wrapped as callback')
const __iterate__ = Symbol('key for all iterate callback')

type Key = string | number | symbol

type Raw = object
type Reaction = object

type Callback = Function & { cleaners?: CallbackSet[]; [__observed__]?: true }
type CallbackSet = Set<Callback>
type CallbackMap = Map<Key, CallbackSet>

interface Operation {
  type?: 'get' | 'iterate' | 'add' | 'set' | 'delete' | 'clear' | 'has' | 'any'
  target: Raw
  key: Key
  receiver?: any
  value?: any
  oldValue?: any
}

export {
  __dependency__,
  __observed__,
  __iterate__,
  Key,
  Raw,
  Reaction,
  Callback,
  CallbackSet,
  CallbackMap,
  Operation,
}
