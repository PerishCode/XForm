import { RenderProps } from './types'

function Info({ schema }: RenderProps) {
  return <div>{schema.data}</div>
}

export default Info
