import { Input } from 'antd'
import { aggregatedOperation as Do } from '@x-form/react'

interface Props {
  schema: {
    data?: any
  }
}

export default function ({ schema }: Props) {
  return (
    <Input
      value={schema.data || ''}
      onChange={(e: any) =>
        Do(() => {
          schema.data = e.target.value
        })
      }
    />
  )
}
