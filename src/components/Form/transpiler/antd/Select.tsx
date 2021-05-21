import { Select } from 'antd'
import { aggregatedOperation as Do } from '@x-form/react'

const { Option } = Select

interface Props {
  schema: {
    data: any
    enum: string[]
  }
}

export default function ({ schema }: Props) {
  return (
    <Select
      value={schema.data || ''}
      onChange={(v: any) =>
        Do(() => {
          schema.data = v
        })
      }
    >
      {schema.enum.map((v, index) => (
        <Option value={v} key={index}>
          {v}
        </Option>
      ))}
    </Select>
  )
}
