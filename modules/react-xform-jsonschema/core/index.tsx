import { useEffect, useRef, useState } from 'react'
import XForm from '@perish/react-xform'
import { compile, extract, compose } from './engine'

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
    compile(schema)
      .then(result => compose(result, builtinFormData.current))
      .then(setParsedSchema)
  }, [schema])

  useEffect(() => {
    formData !== builtinFormData.current &&
      compile(schema)
        .then(result => compose(result, (builtinFormData.current = formData)))
        .then(setParsedSchema)
  }, [formData])

  return (
    <XForm
      schema={parsedSchema}
      onChange={update => onChange((builtinFormData.current = extract(update)))}
    />
  )
}
