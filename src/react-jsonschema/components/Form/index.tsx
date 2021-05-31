import XForm from '@x-form/react-jsonschema'
import transpile from './transpiler'

export default function Form({ schema, formData, onChange, className }) {
  return (
    <XForm
      schema={schema}
      formData={formData}
      onChange={onChange}
      className={className}
      extensions={{ transpile }}
    />
  )
}
