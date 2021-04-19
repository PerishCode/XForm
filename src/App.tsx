import { useState } from 'react'
import { Form } from './examples'

export default function App() {
  const [formData, setFormData] = useState([{ name: '张三' }, { name: '李四' }])
  const [schema] = useState({
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
    <div>
      <Form schema={schema} formData={formData} onChange={setFormData} />
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  )
}
