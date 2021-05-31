import { TranspilerFactory } from '@x-form/react-jsonschema'
import injectors from './injectors'
import generators from './generators'

export default TranspilerFactory({
  injectors,
  generators,
})
