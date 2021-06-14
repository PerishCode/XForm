import { Do } from '@x-form/react-jsonschema'
import { Input } from 'antd'

export default function ({ schema }) {
  return (
    <Input
      className="xform-input"
      value={schema.data}
      onChange={e =>
        Do(() => {
          schema.data = e.target.value
        })
      }
    />
  )
}
