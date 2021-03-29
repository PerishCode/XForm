import { RenderProps } from './types'

interface Rule {
  (data: any, parameters: any): any
}

const rules: {
  [key: string]: Rule
} = {
  'max-length': (data, parameters) => {
    if (data.length > parameters) return '超过最大限制长度'
  },
  'min-length': (data, parameters) => {
    if (data.length < parameters) return '低于最小限制长度'
  },
}

export default function Validator({ schema, children }: RenderProps) {
  return (
    <div className="Validator container">
      <div className="content">{children}</div>
      <div className="rules">
        {schema.data !== undefined &&
          Object.keys(rules)
            .filter(key => schema[key] !== undefined)
            .map(key => (
              <div className="item" key={key}>
                {rules[key](schema.data, schema[key])}
              </div>
            ))}
      </div>
    </div>
  )
}
