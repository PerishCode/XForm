import { FunctionComponent } from 'react'
import { __render__ } from './global'

type Key = string | number | symbol

interface FactoryProps {
  schema: XSchema
  index?: Key
  path?: string
  addition?: any
}

interface XSchema {
  [__render__]: FunctionComponent<FactoryProps>[]
}

export { FactoryProps, XSchema }
