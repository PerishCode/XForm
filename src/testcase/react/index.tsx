import XForm, { __render__, slientOperation } from '@modules/react/core'

function Input({ schema }) {
  return (
    <input
      value={schema.data || ''}
      onChange={e =>
        slientOperation(() => {
          schema.data = e.target.value
        })
      }
    />
  )
}

export default function TestCase() {
  return (
    <XForm
      schema={{
        [__render__]: [Input],
        data: '123',
      }}
    />
  )
}
