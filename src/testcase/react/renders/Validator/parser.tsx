export default {
  'max-length': (data, parameters) => {
    if (data.length > parameters) return '超过最大限制长度'
  },
  'min-length': (data, parameters) => {
    if (data.length < parameters) return '低于最小限制长度'
  },
} as {
  [key: string]: {
    (data: any, parameters: any): any
  }
}
