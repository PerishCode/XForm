import { useEffect, useRef, useState } from 'react'
import XForm from '@perish/react-xform'
import transformer from './transformer'
import extractor from './extractor'
import composer from './composer'

interface Props {
  schema?: any
  formData?: any
  onChange?: any
}

export default function JSONSchemaXForm({
  schema = null,
  formData = null,
  onChange = () => {},
}: Props) {
  const [parsedSchema, setParsedSchema] = useState(null)
  const builtinFormData = useRef(formData)

  useEffect(() => {
    transformer(schema)
      .then(result => composer(result, builtinFormData.current))
      .then(setParsedSchema)
  }, [schema])

  useEffect(() => {
    if (formData === builtinFormData.current) return
    transformer(schema)
      .then(result => composer(result, (builtinFormData.current = formData)))
      .then(setParsedSchema)
  }, [formData])

  return (
    <XForm
      schema={parsedSchema}
      onChange={update =>
        onChange((builtinFormData.current = extractor(update)))
      }
    />
  )
}
