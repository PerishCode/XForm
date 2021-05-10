export const initialSchema = {
  type: 'object',
  properties: {
    a: {
      type: 'array',
      template: {
        type: 'array',
        template: {
          type: 'string',
          enum: ['选项一', '选项二'],
        },
      },
    },
    b: {
      type: 'object',
      properties: {
        c: {
          type: 'array',
          template: {
            type: 'array',
            template: {
              type: 'string',
              enum: ['选项一', '选项二'],
            },
          },
        },
      },
    },
  },
}

export const initialData = null
