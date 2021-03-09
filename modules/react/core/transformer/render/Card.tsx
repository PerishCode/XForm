import { RenderProps } from './types'

function Card({ schema, children }: RenderProps) {
  return (
    <div className="xform-component__Card__container">
      <div className="title">{schema.title || schema.label}</div>
      <div className="content">{children}</div>
    </div>
  )
}

export default Card
