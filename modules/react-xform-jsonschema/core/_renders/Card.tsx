import { RenderProps } from './types'

export default function Card({ schema, children }: RenderProps) {
  return (
    <div className="Card container">
      <div className="title">{schema.title}</div>
      <div className="content">{children}</div>
    </div>
  )
}
