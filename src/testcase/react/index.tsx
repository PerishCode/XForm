import { useState } from 'react'
import XForm from '@perish/react-xform'
import transformer from './transformer'
import extractor from './extractor'
import composer from './composer'

const defaultSchema = {
  type: 'object',
  title: '大量输入项测试',
  properties: {},
}

Array(20)
  .fill(0)
  .forEach((_, i) => {
    defaultSchema.properties['a' + i] = {
      type: 'string',
      title: 'Ding',
    }
  })

export default function TestCase() {
  const [defaultData] = useState({})
  const [formData, setFormData] = useState(null)
  const [schema] = useState(defaultSchema)

  return (
    <div>
      <XForm
        schema={schema}
        transformer={transformer}
        formData={defaultData}
        extractor={extractor}
        composer={composer}
        onChange={setFormData}
      />
    </div>
  )
}
