export default function Card({ schema: { title }, children }) {
  return (
    <div>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  )
}
