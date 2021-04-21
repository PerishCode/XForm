import { useEffect, useState, memo, useRef } from 'react'
import XForm from '@x-form/react'
import {
  defaultTranspiler,
  defaultComposer,
  defualtExtractor,
  TranspilerFactory,
  ComposerFactory,
  ExtractorFactory,
} from './engine'

interface Props {
  schema?: any
  formData?: any
  onChange?: any
  extensions?: any
  className?: string
}

function JSONSchemaXForm({
  schema = null,
  formData = null,
  onChange = () => {},
  extensions = {},
  className,
}: Props) {
  const [parsedSchema, setParsedSchema] = useState(null)
  const innerDataRef = useRef(formData)

  const {
    transpile = defaultTranspiler,
    compose = defaultComposer,
    extract = defualtExtractor,
  } = extensions

  useEffect(() => {
    transpile(JSON.parse(JSON.stringify(schema)))
      .then(s => compose(s, innerDataRef.current))
      .then(setParsedSchema)
  }, [schema])

  useEffect(() => {
    innerDataRef.current !== formData &&
      transpile(JSON.parse(JSON.stringify(schema)))
        .then(s => compose(s, (innerDataRef.current = formData)))
        .then(setParsedSchema)
  }, [formData])

  return (
    <XForm
      className={className}
      schema={parsedSchema}
      onChange={update => onChange((innerDataRef.current = extract(update)))}
    />
  )
}

export default JSONSchemaXForm

export { TranspilerFactory, ComposerFactory, ExtractorFactory }
