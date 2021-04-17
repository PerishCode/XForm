import XForm from '@perish/react-xform-jsonschema'
import transpile from './transpiler'

export default function Form({ schema, formData, onChange }) {
  return (
    <XForm
      schema={schema}
      formData={formData}
      onChange={onChange}
      extensions={{ transpile }}
    />
  )
}
