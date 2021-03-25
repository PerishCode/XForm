import { Factory, __fragment__ } from '@perish/react-xform'
import { combine } from '../utils'

function XArray({ schema: { items = [], template } }) {
  return items.map((item, index) =>
    Factory({ schema: combine(template, item), index })
  )
}

XArray[__fragment__] = true

export default XArray