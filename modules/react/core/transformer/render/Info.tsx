import { RenderProps } from './types'

function Info({ schema }: RenderProps) {
  return <div className="xform-component__Info">{schema.data}</div>
}

export default Info
