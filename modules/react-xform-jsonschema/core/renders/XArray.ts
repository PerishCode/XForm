import { Factory, __fragment__ } from '@perish/react-xform'
import { combine } from '../utils'

function XArray({ schema }) {
  return (schema.items || []).map((item, index) =>
    Factory({ schema: combine(schema.template, item), index })
  )
}

XArray[__fragment__] = true

export default XArray
