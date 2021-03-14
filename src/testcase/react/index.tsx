import { useState } from 'react'
import XForm from '@perish/react-xform'
import transformer from './transformer'
import extractor from './extractor'
import composer from './composer'

export default function TestCase() {
  const [defaultData] = useState([
    {
      a: 'aaaa',
    },
  ])
  const [formData, setFormData] = useState(null)
  const [schema] = useState({
    type: 'array',
    template: {
      type: 'object',
      title: 'Link 类型测试',
      properties: {
        a: {
          type: 'link',
          title: '设备',
          url: '/api/object',
        },
      },
    },
  })

  return (
    <div>
      <XForm
        schema={schema}
        formData={defaultData}
        transformer={transformer}
        extractor={extractor}
        composer={composer}
        onChange={setFormData}
      />

      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  )
}
