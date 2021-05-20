import { useEffect, useRef } from 'react'
import JE from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'

export default function Editor({ onChange, json = null, className = '' }: any) {
  const containerRef = useRef(null as any)
  const editorRef = useRef(null as any)
  const jsonRef = useRef(null as any)

  useEffect(() => {
    editorRef.current = new JE(
      containerRef.current,
      {
        mode: 'code',
        mainMenuBar: false,
        onChange() {
          try {
            const result = editorRef.current.get()
            jsonRef.current = result
            onChange && onChange(jsonRef.current)
          } catch (error) {}
        },
      },
      null
    )
  }, [])

  useEffect(() => {
    jsonRef.current !== json && editorRef.current.set((jsonRef.current = json))
  }, [json])

  return <div ref={containerRef} className={className} />
}
