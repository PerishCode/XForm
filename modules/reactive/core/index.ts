import { isObject } from './utils'
import { Raw } from './types'
import { raw2reaction, reaction2raw } from './global'

function reactive(raw: Raw): any {
  if (!isObject(raw) || reaction2raw.has(raw)) return raw
  if (raw2reaction.has(raw)) return raw2reaction.get(raw)
}

function observe(f: Function) {}

export { reactive, observe }
