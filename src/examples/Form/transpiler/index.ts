import { TranspilerFactory } from '@perish/react-xform-jsonschema'
import injectors from './injectors'
import generators from './generators'

export default TranspilerFactory({
  injectors,
  generators,
})
