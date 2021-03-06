import {
  reactive,
  wrapAsDependency as $,
  observeEasy,
  slientOperation,
} from '@modules/reactive/core'
// // 基本依赖关系 & 链式依赖关系验证
// export default function Testcase() {

//   const source = {
//     a: 1,
//     b: 2,
//     c: $(node => {
//       return node.a + node.b
//     }),
//     d: $(node => {
//       return node.a + node.b + node.c
//     }),
//   }

//   const result = reactive(source)
//   result.d
//   result.a = 10
//   result.b = 15

// }

// // 初步检查依赖关系变更是否会引起内存泄漏
// export default function Testcase() {
//   const source = {
//     a: [1, 2, 3, 4, 5],
//     b: $(node => {
//       let sum = 0
//       node.a.forEach(v => (sum += v))
//       return sum
//     }),
//   }

//   const result = reactive(source)

//   for (let i = 0; i < 20000; ++i) {
//     result.b = $(node => {
//       let sum = 15
//       node.a.forEach(v => (sum += v))
//       return sum
//     })

//     result.b
//   }
// }

// // 初步检查遍历型方法是否正确触发回调
// export default function Testcase() {
//   const source = {
//     a: [1, 2, 3, 4, 5],
//     b: $(node => {
//       let sum = 0
//       node.a.forEach(v => (sum += v))
//       console.log('computing b', sum)
//       return sum
//     }),
//     c: $(node => {
//       const result = node.a[2]
//       console.log('computing c', result)
//       return result
//     }),
//   }

//   const result = reactive(source)

//   observeEasy(() => {
//     console.log('Haha')
//   })

//   console.log('initialize')

//   result.b
//   result.c
//   console.log('-----')
//   result.a.splice(1, 1)
//   console.log('-----')
//   result.a.shift()
//   console.log('-----')
//   result.a.unshift(15)
//   console.log('-----')
//   result.a.push(123)
// }

// 初步检查一次性触发型回调方法是否正常运行
export default function Testcase() {
  const source = {
    a: [1, 2, 3, 4, 5],
    b: $(node => {
      let sum = 0
      node.a.forEach(v => (sum += v))
      console.log('computing b', sum)
      return sum
    }),
  }

  const result = reactive(source)

  observeEasy(() => {
    console.log('Haha')
  })

  console.log('initialize')

  result.b
  console.log('-----')
  slientOperation(() => {
    result.a.splice(1, 1)
  })
}
