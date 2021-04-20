import TranspilerFactory from './transpiler'
import ComposerFactory from './composer'
import ExtractorFactory from './extractor'

const defaultTranspiler = TranspilerFactory()
const defaultComposer = ComposerFactory()
const defualtExtractor = ExtractorFactory()

export {
  defaultTranspiler,
  defaultComposer,
  defualtExtractor,
  TranspilerFactory,
  ComposerFactory,
  ExtractorFactory,
}
