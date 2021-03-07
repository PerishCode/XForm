import { Factory, __fragment__ } from '../../index'
import { RenderProps } from './types'

function XArray({ schema }: RenderProps) {
  return (schema.items as any[]).map((item, index) =>
    Factory({ schema: item, addition: schema.template, index })
  )
}

XArray[__fragment__] = true

export default XArray
