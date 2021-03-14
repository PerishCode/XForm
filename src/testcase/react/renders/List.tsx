export default function List({ children }) {
  return (
    <div className="xform-component__List__container">
      {children.map((line, index) => (
        <div key={index} className="xform-component__List__item">
          {line}
        </div>
      ))}
    </div>
  )
}
