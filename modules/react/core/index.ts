import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  reactive,
  observeEasy,
  unobserveEasy,
  aggregatedOperation,
  wrapAsDependency,
} from '@x-form/model'
import { Factory } from './engine'
import { __render__, __fragment__ } from './global'

interface XFormProps {
  schema?: any
  className?: string
  onChange?: Function
}

function XForm({ schema, onChange = () => {}, className }: XFormProps) {
  const containerRef = useRef()
  const reactionRef = useRef()

  useEffect(() => {
    function updateHandler(rerender = true) {
      const reaction = reactionRef.current
      const container = containerRef.current
      rerender && ReactDOM.render(Factory({ schema: reaction }), container)
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
  }, [schema])

  return React.createElement('div', {
    ref: containerRef,
    className: className ?? 'xform',
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
