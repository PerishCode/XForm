import { useEffect, useRef } from 'react'
import JE from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'

export default function Viewer({ json = null, className = '' }: any) {
  const containerRef = useRef(null as any)
  const editorRef = useRef(null as any)

  useEffect(() => {
    editorRef.current = new JE(
      containerRef.current,
      {
        mode: 'view',
        mainMenuBar: true,
      },
      null
    )
  }, [])

  useEffect(() => {
    editorRef.current.set(json)
  }, [json])

  return <div ref={containerRef} className={className} />
}
