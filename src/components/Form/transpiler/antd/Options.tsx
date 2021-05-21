import { Button } from 'antd'
import { Do, __fragment__ } from '@x-form/react-jsonschema'

interface Props {
  schema: any
  children: any[]
}

function Options({ schema, children }: Props) {
  const { items, initialText } = schema

  if (children.length === 0)
    return (
      <Button onClick={() => Do(() => (schema.items = [{}]))}>
        {initialText || '初始化数据项'}
      </Button>
    )

  return children.map((child, index) => {
    const operators = (
      <div key="operator">
        <Button onClick={_ => Do(() => items.splice(index + 1, 0, {}))}>
          创建
        </Button>
        <Button onClick={_ => Do(() => items.splice(index, 1))}>删除</Button>
      </div>
    )
    return Array.isArray(child)
      ? child.concat(operators)
      : [child].concat(operators)
  })
}

Options[__fragment__] = true

export default Options
