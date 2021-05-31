import { aggregatedOperation as Do } from '@x-form/react'

export default function Select({ schema }) {
  return (
    <select
      value={schema.data || ''}
      onChange={(e: any) =>
        Do(() => {
          schema.data = e.target.value
        })
      }
    >
      <option value="">--------</option>
      {schema.enum.map((v, index) => (
        <option value={v} key={index}>
          {v}
        </option>
      ))}
    </select>
  )
}
