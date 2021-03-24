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
  const formDataRef = useRef(null)

  useEffect(() => {
    transformer(schema)
      .then(result => composer(result, formDataRef.current))
      .then(setParsedSchema)
  }, [schema])

  useEffect(() => {
    formData !== formDataRef.current &&
      transformer(schema)
        .then(result => composer(result, (formDataRef.current = formData)))
        .then(setParsedSchema)
  }, [formData])

  return (
    <XForm
      schema={parsedSchema}
      onChange={updateSchema =>
        onChange((formDataRef.current = extractor(updateSchema)))
      }
    />
  )
}
