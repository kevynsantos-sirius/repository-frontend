import { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

type Props = {
  value: string
  onChange: (value: string) => void
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return

    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link'],
          ['clean']
        ]
      }
    })

    quillRef.current.on('text-change', () => {
      onChange(quillRef.current!.root.innerHTML)
    })
  }, [])

  // sincroniza quando troca layout/massa
  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current
      if (editor.root.innerHTML !== value) {
        editor.root.innerHTML = value || ''
      }
    }
  }, [value])

  return <div ref={editorRef} />
}
