import { combine } from './utils'

const composerMap = new Map([
  [
    'object',
    ({ properties }, data = {}) => {
      Object.keys(data).forEach(key => compose(properties[key], data[key]))
    },
  ],
  [
    'array',
    (schema, formData = []) => {
      schema.items = formData.map(data =>
        compose(combine(schema.template, {}), data)
      )
    },
  ],
  [
    'default',
    (schema, formData) => {
      schema['data'] = formData
    },
  ],
])

function compose(schema, data) {}

function extract() {}

async function compile() {}

function registerType() {}

export { compose, extract, compile, registerType }
