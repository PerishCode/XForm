import { aggregatedOperation as X } from '@perish/react-xform'

export default function Input({ schema }) {
  return (
    <input
      className="Input"
      value={schema.data || ''}
      onChange={e => X(() => (schema.data = e.target.value))}
    />
  )
}
