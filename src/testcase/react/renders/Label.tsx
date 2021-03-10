function Label({ schema, children }) {
  return (
    <div className="xform-component__Label__container">
      <div className="xform-component__Label__title">{schema.title}</div>
      <div className="xform-component__Label__content">{children}</div>
    </div>
  )
}

export default Label
