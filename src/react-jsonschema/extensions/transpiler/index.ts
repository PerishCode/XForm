import { TranspilerFactory } from '@x-form/react-jsonschema'
import renderGenerators from './renderGenerators'
import propsInjectors from './propsInjectors'

export default TranspilerFactory({
  propsInjectors,
  renderGenerators,
})
