import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  reactive,
  observeEasy,
  unobserveEasy,
  aggregatedOperation,
  wrapAsDependency,
} from '@perish/reactive'
import { Factory } from './engine'
import { __render__, __fragment__ } from './global'

interface XFormProps {
  schema?: any
  onChange?: Function
}

function XForm({ schema, onChange = () => {} }: XFormProps) {
  const containerRef = useRef()
  const reactionRef = useRef()

  useEffect(() => {
    function updateHandler() {
      const reaction = reactionRef.current
      const container = containerRef.current
      ReactDOM.render(Factory({ schema: reaction }), container)
      onChange(reaction)
    }

    observeEasy(updateHandler)
    return () => unobserveEasy(updateHandler)
  }, [])

  useEffect(() => {
    reactionRef.current = reactive(schema || {})
    const reaction = reactionRef.current
    const container = containerRef.current
    ReactDOM.render(Factory({ schema: reaction }), container)
    onChange(reaction)
  }, [schema])

  return React.createElement('div', {
    ref: containerRef,
    className: 'xform-root',
  })
}

export default XForm

export {
  __render__,
  __fragment__,
  Factory,
  aggregatedOperation,
  wrapAsDependency,
}
