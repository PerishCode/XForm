import { useEffect, useRef, useState } from 'react'
import XForm from '@perish/react-xform'
import { transpile, extract, compose } from './engine'

interface Props {
  schema?: any
  formData?: any
  onChange?: any
}

async function parse(schema, data) {
  schema = await transpile(schema)
  schema = await compose(schema, data)
  return schema
}

export default function JSONSchemaXForm({
  schema = null,
  formData = null,
  onChange = () => {},
}: Props) {
  const [parsedSchema, setParsedSchema] = useState(null)

  // 组件内部维护 formData
  const dataRef = useRef(formData)

  useEffect(() => {
    parse(JSON.parse(JSON.stringify(schema)), dataRef.current).then(
      setParsedSchema
    )
  }, [schema])

  useEffect(() => {
    formData !== dataRef.current &&
      parse(schema, (dataRef.current = formData)).then(setParsedSchema)
  }, [formData])

  return (
    <XForm
      schema={parsedSchema}
      onChange={update => onChange((dataRef.current = extract(update)))}
    />
  )
}
