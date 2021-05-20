import { Factory, __fragment__ } from '@x-form/react'
import { combine } from '../global'

function XArray({ schema: { items = [], template } }) {
  return items.map((item, index) =>
    Factory({ schema: combine(template, item), index })
  )
}

XArray[__fragment__] = true

export default XArray
