import { Card } from 'antd'

interface Props {
  schema: {
    title: string
  }
  children?: any
}

export default function ({ schema, children }: Props) {
  return <Card title={schema.title}>{children}</Card>
}
