import { useEffect, useState } from 'react'
import {
  aggregatedOperation as O,
  Factory,
  __render__,
} from '@perish/react-xform'
import transformer from '../transformer'
import composer from '../composer'
import axios from 'axios'

export default function Link({ schema }) {
  const [options, setOptions] = useState([])
  const [subSchema, setSubSchema] = useState({ [__render__]: [] } as any)
  const { url, uid } = schema

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setOptions)
  }, [url])

  useEffect(() => {
    uid &&
      axios
        .get(url + '/' + uid)
        .then(({ data: { schema: schemaUrl, content } }) =>
          axios.get(schemaUrl).then(({ data: initialSchema }) =>
            transformer(initialSchema, 0, true)
              .then(s => composer(s, content))
              .then(setSubSchema)
          )
        )
  }, [url, uid])

  return schema.uid === undefined ? (
    <select
      onChange={e =>
        O(() => {
          schema.uid = e.target.value
        })
      }
    >
      <option>Empty</option>
      {options.map((o: any) => (
        <option value={o.id} key={o.id}>
          {o.id}
        </option>
      ))}
    </select>
  ) : (
    <div>
      <Factory schema={subSchema} />
      <button
        onClick={() =>
          O(() => {
            schema.uid = undefined
          })
        }
      >
        clear
      </button>
    </div>
  )
}
