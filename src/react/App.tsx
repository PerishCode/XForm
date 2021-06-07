import XForm, { __render__, aggregatedOperation as Do } from '@x-form/react'
import { Input } from 'antd'
import { useState } from 'react'
import './App.less'

function XInput({ schema }) {
  return (
    <Input
      value={schema.data}
      onChange={e =>
        Do(() => {
          schema.data = e.target.value
        })
      }
    />
  )
}

function Label({ schema, children }) {
  return (
    <div>
      <span>{schema.title}</span>
      <span>{children}</span>
    </div>
  )
}

function XTooltip({ schema, children }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="tooltip"
      onMouseEnter={_ => setHover(true)}
      onMouseLeave={_ => setHover(false)}
    >
      {hover && <span className="title">{schema.description}</span>}
      <span>{children}</span>
    </div>
  )
}

export default function () {
  return (
    <XForm
      schema={{
        [__render__]: [XInput, XTooltip, Label],
        data: '初始值',
        title: '数据项 X',
        description: 'String 型数值',
      }}
    />
  )
}
