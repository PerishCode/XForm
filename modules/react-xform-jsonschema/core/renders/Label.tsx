import { RenderProps } from './types'

export default function Label({ schema, children }: RenderProps) {
  return (
    <div className="Label container">
      <div className="title">{schema.title}</div>
      <div className="content">{children}</div>
    </div>
  )
}
