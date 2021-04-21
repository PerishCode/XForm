import { useState } from 'react'
import { Form, Editor, Viewer } from './components'
import 'jsoneditor/dist/jsoneditor.css'
import './App.sass'

export default function App() {
  const [formData, setFormData] = useState([{ name: '张三' }, { name: '李四' }])
  const [schema, setSchema] = useState({
    type: 'array',
    title: '用户列表',
    template: {
      type: 'object',
      title: '用户信息',
      properties: {
        name: {
          title: '姓名',
          type: 'string',
        },
        sex: {
          title: '性别',
          type: 'string',
        },
      },
    },
  })

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
