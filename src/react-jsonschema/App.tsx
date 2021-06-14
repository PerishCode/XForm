import { useEffect, useState } from 'react'
import MonacoEditor from 'react-monaco-editor'
import XForm from '@x-form/react-jsonschema'
import extensions from './extensions'
import './App.less'

export default function App() {
  const [formData, setFormData] = useState(null)
  const [schema, setSchema] = useState({})
  const [text, setText] = useState(
    JSON.stringify(
      {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            title: '姓名',
          },
        },
      },
      null,
      2
    )
  )

  useEffect(() => {
    try {
      const result = JSON.parse(text)
      setSchema(result)
    } catch (e) {}
  }, [text])

  return (
    <>
      <div className="editor">
        <MonacoEditor
          width="100%"
          height="100%"
          language="json"
          theme="vs-light"
          value={text}
          onChange={setText}
          options={{
            minimap: {
              showSlider: 'mouseover',
            },
          }}
        />
      </div>
      <XForm
        className="form"
        schema={schema}
        formData={formData}
        onChange={setFormData}
        extensions={extensions}
      />
    </>
  )
}
