import { aggregatedOperation as Do } from '@x-form/react'

export default function Input({ schema }) {
  return (
    <input
      value={schema.data || ''}
      onChange={(e: any) =>
        Do(() => {
          schema.data = e.target.value
        })
      }
    />
  )
}
