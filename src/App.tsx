import { useState } from 'react'
import { Form, Editor, Viewer } from './components'
import { initialData, initialSchema } from './schemas/select'
import './App.less'

fetch('/mock/schema/123', {
  method: 'POST',
})
  .then(res => res.text())
  .then(console.log)

export default function App() {
  const [formData, setFormData] = useState(initialData)
  const [schema, setSchema] = useState(initialSchema)

  return (
    <>
      <Editor className="editor" json={schema} onChange={setSchema} />
      <Form
        className="form"
        schema={schema}
        formData={formData}
        onChange={setFormData}
      />
      <Viewer className="preview" json={formData} />
    </>
  )
}
