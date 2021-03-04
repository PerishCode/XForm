import { isObject } from './utils'
import { Raw, Dependency } from './types'

function reactive(raw: Raw): any {
  if (!isObject(raw)) return raw
}

function observe(f: Function) {}

export { reactive, observe }
