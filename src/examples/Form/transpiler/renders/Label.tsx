export default function Label({ schema: { title }, children }) {
  return (
    <div>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  )
}
