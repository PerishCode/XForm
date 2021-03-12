import { RenderProps } from '../types'
import parser from './parser'

function Validator({ schema, configuration, children }: RenderProps) {
  let result: any = []

  if (schema.data !== undefined) {
    Object.keys(configuration).forEach(key => {
      if (parser[key] === undefined) return
      const hint = parser[key](schema.data, configuration[key])
      if (hint === null || hint === undefined) return
      result.push(
        <div key={key} className="xform-component__Validator__rules__item">
          {hint}
        </div>,
      )
    })
  }

  return (
    <div className="xform-component__Validator__container">
      <div className="xform-component__Validator__content">{children}</div>
      <div className="xform-component__Validator__rules">{result}</div>
    </div>
  )
}

export default Validator
