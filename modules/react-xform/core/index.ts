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
import { __render__, __withHooks__, __fragment__ } from './global'

interface XFormProps {
  schema?: any
  formData?: any
  onChange?: Function
  transformer?: Function
  extractor?: Function
  composer?: Function
}

function XForm({
  schema,
  formData,
  onChange,
  transformer,
  extractor,
  composer,
}: XFormProps) {
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
  }, [])

  useEffect(() => {
    schema &&
      new Promise(rs => rs(transformer ? transformer(schema) : schema))
        .then(result => (composer ? composer(result, formData) : result))
        .then(render)
  }, [schema, transformer, formData, composer])

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
}
