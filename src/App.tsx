import XForm from '@perish/react-xform'
import { transformer } from '@perish/react-xform-jsonschema'

export default function App() {
  return (
    <XForm
      schema={{
        type: 'object',
        properties: {
          a: {
            type: 'string',
            data: 123,
          },
        },
      }}
      transformer={transformer}
    />
  )
}
