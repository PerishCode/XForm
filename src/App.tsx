import { useEffect, useState } from 'react'
import { compose, split } from './uitls'
import { Form, Editor, Viewer } from './components'
import { initialData, initialSchema } from './schemas/select'
import 'jsoneditor/dist/jsoneditor.css'
import './App.less'

export default function App() {
  const [formData, setFormData] = useState(initialData)
  const [schema, setSchema] = useState(initialSchema)

  useEffect(() => {
    // console.log(split(schema))

    const s = split(schema)

    console.log(s)

    const c = compose(s)

    console.log(c)
  }, [schema])

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
