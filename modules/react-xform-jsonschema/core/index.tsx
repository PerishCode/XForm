import { useEffect, useRef, useState } from 'react'
import XForm from '@perish/react-xform'
import transformer from './_transformer'
import extractor from './_extractor'
import composer from './_composer'

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
    formData !== builtinFormData.current &&
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
