import { raw2reaction, reaction2raw } from './global'
import { isObject } from './utils'
import { Operation, Raw, __dependency__ } from './types'
import {
  observe,
  unobserve,
  combine,
  observeEasy,
  unobserveEasy,
  aggregatedOperation,
} from './engine'
import handlers from './handlers'

function reactive(raw: Raw): any {
  if (!isObject(raw) || reaction2raw.has(raw)) return raw
  if (raw2reaction.has(raw)) return raw2reaction.get(raw)

  const reaction = new Proxy(raw, handlers.get(raw.constructor))
  raw2reaction.set(raw, reaction)
  reaction2raw.set(reaction, raw)
  return reaction
}

function wrapAsDependency(f: Function) {
  f[__dependency__] = true
  return f
}

export {
  reactive,
  observe,
  unobserve,
  wrapAsDependency,
  combine,
  observeEasy,
  unobserveEasy,
  aggregatedOperation,
}
