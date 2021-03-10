import { Factory, __fragment__ } from '@perish/react-xform'

function XArray({ schema }) {
  return (schema.items as any[]).map((item, index) =>
    Factory({ schema: item, addition: schema.template, index })
  )
}

XArray[__fragment__] = true

export default XArray
