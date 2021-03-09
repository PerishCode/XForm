import XForm, { __render__, wrapAsDependency as $ } from '@xform/react'
import {
  Input,
  XArray,
  XObject,
  Info,
} from '@xform/react/dist/transformer/render'
import transformer from '@xform/react/dist/transformer/sync'

// //验证基本功能
// export default function TestCase() {
// return (
//   <XForm
//     schema={{
//       [__render__]: [XObject],
//       properties: {
//         sum: {
//           [__render__]: [Info],
//           data: $(node => {
//             const { inputs } = node.$
//             let sum = 0
//             inputs.items.forEach(item => (sum += Number(item.data)))
//             return sum
//           }),
//         },
//         inputs: {
//           [__render__]: [XArray],
//           template: {
//             [__render__]: [Input],
//           },
//           items: Array(1000)
//             .fill(null)
//             .map(() => ({
//               data: '0',
//             })),
//         },
//       },
//     }}
//   />
// )
// }

export default function TestCase() {
  return <XForm schema={{}} transformer={transformer} />
}
