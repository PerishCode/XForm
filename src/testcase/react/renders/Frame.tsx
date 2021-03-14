export default function Frame({ schema, children }) {
  return (
    <div className="xform-component__Frame__container">
      <div className="xform-component__Frame__title">{schema.title}</div>
      <div className="xform-component__Frame__content">{children}</div>
    </div>
  )
}
