import { useState } from 'react'
import XForm from '@perish/react-xform-jsonschema'

export default function App() {
  const [formData, setFormData] = useState(['123'])
  const [schema] = useState({
    type: 'array',
    template: {
      type: 'string',
    },
  })

  return (
    <>
      <XForm schema={schema} formData={formData} onChange={setFormData} />
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </>
  )
}
