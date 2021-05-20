type Schema = any

interface Extractor {
  (schema: Schema): any
}

interface ExtractorMap {
  [key: string]: Extractor
}

export { Schema, Extractor, ExtractorMap }
