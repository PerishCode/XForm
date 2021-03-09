import { aggregatedOperation } from '../../index'
import { RenderProps } from './types'

function Input({ schema }: RenderProps) {
  return (
    <input
      className="xform-component__Input"
      value={schema.data || ''}
      onChange={e =>
        aggregatedOperation(() => {
          schema.data = e.target.value
        })
      }
    />
  )
}

export default Input
