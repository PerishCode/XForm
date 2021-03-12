import { Factory, __fragment__ } from '@perish/react-xform'

function XArray({ schema }) {
  return (schema.items || []).map((item, index) =>
    Factory({ schema: schema.template, addition: item, index }),
  )
}

XArray[__fragment__] = true

export default XArray
