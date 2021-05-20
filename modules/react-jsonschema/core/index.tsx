import { useEffect, useState, useRef } from 'react'
import XForm, {
  aggregatedOperation as Do,
  __fragment__,
  __render__,
} from '@x-form/react'

import TranspilerFactory from './transpiler'
import ComposerFactory from './composer'
import ExtractorFactory from './extractor'

const defaultTranspiler = TranspilerFactory()
const defaultComposer = ComposerFactory()
const defualtExtractor = ExtractorFactory()

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
      .then((s: any) => compose(s, innerDataRef.current))
      .then(setParsedSchema)
  }, [schema])

  useEffect(() => {
    if (innerDataRef.current === formData) return

    transpile(JSON.parse(JSON.stringify(schema)))
      .then((s: any) => compose(s, (innerDataRef.current = formData)))
      .then(setParsedSchema)
  }, [formData])

  return (
    <XForm
      className={className}
      schema={parsedSchema}
      onChange={(update: any) =>
        onChange((innerDataRef.current = extract(update)))
      }
    />
  )
}

export default JSONSchemaXForm

export {
  TranspilerFactory,
  ComposerFactory,
  ExtractorFactory,
  Do,
  __fragment__,
  __render__,
}
