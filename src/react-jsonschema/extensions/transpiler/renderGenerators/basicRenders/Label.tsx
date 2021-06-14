import { __fragment__ } from '@x-form/react-jsonschema'

function Label({ schema, children }) {
  return (
    <div className="xform-label">
      <span className="xform-label-title">{schema.title}</span>
      <span className="xform-label-content">{children}</span>
    </div>
  )
}

export default Label
