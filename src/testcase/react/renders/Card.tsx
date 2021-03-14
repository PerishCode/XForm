function Card({ schema, children }) {
  return (
    <div className="xform-component__Card__container">
      <div className="xform-component__Card__title">{schema.title}</div>
      <div className="xform-component__Card__content">{children}</div>
    </div>
  )
}

export default Card
