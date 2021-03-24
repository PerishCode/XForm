import { useEffect, useState } from 'react'
import XForm from '@perish/react-xform-jsonschema'

export default function App() {
  const [schema, setSchema] = useState({
    type: 'object',
    properties: {
      a: {
        type: 'string',
      },
      b: {
        type: 'string',
      },
    },
  })
  const [formData, setFormData] = useState(null)

  return (
    <div>
      <XForm schema={schema} formData={formData} onChange={setFormData} />
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  )
}
