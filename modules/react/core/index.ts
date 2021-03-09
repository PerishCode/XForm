import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import {
  reactive,
  observeEasy,
  unobserveEasy,
  aggregatedOperation,
  wrapAsDependency,
  combine,
} from '@xform/reactive'
import { Factory } from './engine'
import { __render__, __withHooks__, __fragment__ } from './global'

interface XFormProps {
  schema?: any
  onChange?: Function
  transformer?: Function
  extractor?: Function
}

function XForm({ schema, onChange, transformer, extractor }: XFormProps) {
  const containerRef = useRef()
  const reactionRef = useRef()

  function render(source: any = null) {
    if (source) reactionRef.current = reactive(source)

    const reaction = reactionRef.current

    onChange && onChange(extractor ? extractor(reaction) : reaction)
    reaction &&
      ReactDOM.render(Factory({ schema: reaction }), containerRef.current)
  }

  useEffect(() => {
    function defaultRender() {
      render()
    }
    observeEasy(defaultRender)
    return () => unobserveEasy(defaultRender)
  }, [extractor])

  useEffect(() => {
    schema &&
      new Promise(resolve =>
        resolve(transformer ? transformer(schema) : schema)
      ).then(render)
  }, [schema, transformer])

  return React.createElement('div', {
    ref: containerRef,
    className: 'xform-root',
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
  combine,
}
