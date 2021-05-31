export default function Label({ schema: { title }, children }) {
  return (
    <div className="label">
      <div className="title">{title}</div>
      <div className="content">{children}</div>
    </div>
  )
}
