import { aggregatedOperation } from '@perish/react-xform'

function Input({ schema }) {
  return (
    <input
      className="xform-component__Input"
      value={schema.data || ''}
      onChange={e =>
        aggregatedOperation(() => {
          schema.data = e.target.value
        })
      }
    />
  )
}

export default Input
