import { useEffect, useState, memo } from 'react'
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
}

function JSONSchemaXForm({
  schema = null,
  formData = null,
  onChange = () => {},
  extensions = {},
}: Props) {
  const [parsedSchema, setParsedSchema] = useState(null)

  const {
    transpile = defaultTranspiler,
    compose = defaultComposer,
    extract = defualtExtractor,
  } = extensions

  useEffect(() => {
    transpile(JSON.parse(JSON.stringify(schema)))
      .then(s => compose(s, formData))
      .then(setParsedSchema)
  }, [schema, formData])

  return (
    <XForm
      schema={parsedSchema}
      onChange={update => onChange(extract(update))}
    />
  )
}

export default memo(JSONSchemaXForm, (prev, next) => {
  return prev.schema !== next.schema
})

export { TranspilerFactory, ComposerFactory, ExtractorFactory }
