export const __dependency__ = Symbol('date item as dependency')

export type Key = string | number | symbol

export type Raw = object
export type Reaction = object

export type Dependency = Function & { [__dependency__]: true }

export type Callback = Function & { cleaners?: CallbackSet[] }
export type CallbackSet = Set<Callback>
export type CallbackMap = Map<Key, CallbackSet>

export interface Operation {
  type?: 'get' | 'iterate' | 'add' | 'set' | 'delete' | 'clear' | 'has' | 'any'
  target: Raw
  key: Key
  receiver?: any
  value?: any
  oldValue?: any
}
