import { __fragment__, aggregatedOperation as Q } from '@perish/react-xform'

function Options({ schema, children }) {
  const { items } = schema

  return children.map((line, index) => {
    const operators = (
      <div className="xform-component__Options__container" key="operator">
        <button
          className="xform-component__Options__operator"
          onClick={_ => Q(() => items.splice(index + 1, 0, {}))}
        >
          +
        </button>
        <button
          className="xform-component__Options__operator"
          onClick={_ => Q(() => items.splice(index, 1))}
        >
          -
        </button>
        <button
          className="xform-component__Options__operator"
          onClick={_ =>
            Q(() => {
              ;[items[index], items[index - 1]] = [
                items[index - 1],
                items[index],
              ]
            })
          }
          disabled={index === 0}
        >
          ↑
        </button>
        <button
          className="xform-component__Options__operator"
          onClick={_ =>
            Q(() => {
              ;[items[index], items[index + 1]] = [
                items[index + 1],
                items[index],
              ]
            })
          }
          disabled={index + 1 === items.length}
        >
          ↓
        </button>
      </div>
    )
    return Array.isArray(line)
      ? line.concat(operators)
      : [line].concat(operators)
  })
}

Options[__fragment__] = true

export default Options
