import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  reactive,
  observeEasy,
  unobserveEasy,
  slientOperation,
} from '@xform/reactive'
import { Factory } from './engine'
import { __render__, __withHooks__ } from './global'

interface XFormProps {
  schema?: any
  onChange?: Function
  transformer?: Function
}

function XForm({ schema, onChange, transformer }: XFormProps) {
  const containerRef = useRef()
  const reactionRef = useRef()

  function render(source: any = null) {
    if (source) reactionRef.current = reactive(source)
    const reaction = reactionRef.current

    onChange && onChange(reaction)
    reaction &&
      ReactDOM.render(Factory({ schema: reaction }), containerRef.current)
  }

  useEffect(() => {
    function defaultRender() {
      render()
    }
    observeEasy(defaultRender)
    return unobserveEasy(defaultRender)
  }, [])

  useEffect(() => {
    if (!schema) return
    render(transformer ? transformer(schema) : schema)
  }, [schema, transformer])

  return React.createElement('div', {
    ref: containerRef,
    className: 'XForm root',
  })
}

export default XForm

export { __render__, __withHooks__, Factory, slientOperation }
