import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  reactive,
  observeEasy,
  unobserveEasy,
  aggregatedOperation,
  wrapAsDependency,
} from '@xform/reactive'
import { Factory } from './engine'
import { __render__, __withHooks__, __fragment__ } from './global'

interface XFormProps {
  schema?: any
  onChange?: Function
  transformer?: Function
  asyncTransformer?: Function
}

function XForm({
  schema,
  onChange,
  transformer,
  asyncTransformer,
}: XFormProps) {
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
    return () => unobserveEasy(defaultRender)
  }, [])

  useEffect(() => {
    if (!schema) return
    // if (transformer) render(transformer(schema))
    // else if (asyncTransformer) asyncTransformer(schema).then(render)
    if (transformer) {
      if (transformer.constructor.name === 'AsyncFunction')
        transformer(schema).then(render)
      else render(transformer(schema))
    } else render(schema)
  }, [schema, transformer, asyncTransformer])

  return React.createElement('div', {
    ref: containerRef,
    className: 'XForm root',
  })
}

export default XForm

export {
  __render__,
  __withHooks__,
  __fragment__,
  Factory,
  aggregatedOperation,
  wrapAsDependency,
}
