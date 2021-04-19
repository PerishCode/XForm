import { aggregatedOperation as Do } from '@perish/react-xform'

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
