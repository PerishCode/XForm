import { aggregatedOperation as Do, __fragment__ } from '@x-form/react'

function Options({ schema, children }) {
  const { items, initialText } = schema

  if (children.length === 0)
    return (
      <button onClick={() => Do(() => (schema.items = [{}]))}>
        {initialText || '初始化数据项'}
      </button>
    )

  return children.map((child, index) => {
    const operators = (
      <div key="operator">
        <button onClick={_ => Do(() => items.splice(index + 1, 0, {}))}>
          创建
        </button>
        <button onClick={_ => Do(() => items.splice(index, 1))}>删除</button>
      </div>
    )
    return Array.isArray(child)
      ? child.concat(operators)
      : [child].concat(operators)
  })
}

Options[__fragment__] = true

export default Options
