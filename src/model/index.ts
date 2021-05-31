import { reactive, wrapAsDependency as $ } from '@x-form/model'

declare global {
  interface Window {
    model: any
  }
}

export default function () {
  window.model = reactive({
    a: 1,
    b: 2,
    c: 3,
    sum: $(node => {
      const { a, b, c } = node
      const s = a + b + c

      console.log('calculating sum, new value: ', s)

      return s
    }),
  })
}
