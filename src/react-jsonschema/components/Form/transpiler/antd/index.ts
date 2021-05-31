/* 基础组件 */
import Input from './Input'
import Select from './Select'
/* ------- */

/* 高阶组件 */
import Options from './Options'
/* ------- */

/* 容器组件 */
import Card from './Card'
import Label from './Label'
/* ------- */

import HOC, { __depth__ } from './HOC'

const renders = { Input, Select, Options, Card, Label }

Object.keys(renders).forEach(key => (renders[key] = HOC(renders[key])))

export default renders

export { __depth__ }
