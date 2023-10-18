import { useEffect, useState } from 'react'
import '../../style/editor.css'

import 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/theme-monokai'
import AceEditor from 'react-ace'

type EditorOptionsValuesType = {
  [key: string]: string
}

type EditorProps = {
  editorOptionsValues: EditorOptionsValuesType
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
}


export const Editor = ({ editorOptionsValues, query, setQuery }: EditorProps) => {
  const [aceEditorStyle, setAceEditorStyle] = useState({
    width: '100%',
    height: '380px',
    fontSize: editorOptionsValues.fontsize,
    background: editorOptionsValues.background,
  })

  useEffect(() => {
    const updateEditorStyles = () => {
      const elementLine = document.querySelector(".ace_line") as HTMLElement
      const elementSidebarLine = document.querySelector(".ace_gutter-active-line") as HTMLElement
      const elementSidebar = document.querySelector(".ace_gutter") as HTMLElement

      if (elementLine) {
        elementLine.style.backgroundColor = editorOptionsValues.linecolor
      }

      if (elementSidebarLine) {
        elementSidebarLine.style.backgroundColor = editorOptionsValues.linecolor
      }

      if (elementSidebar) {
        elementSidebar.style.backgroundColor = editorOptionsValues.sidebarcolor
      }

      setAceEditorStyle({
        ...aceEditorStyle,
        background: editorOptionsValues.background,
        fontSize: editorOptionsValues.fontsize,
      })
    }

    updateEditorStyles()
  }, [editorOptionsValues])

  return (
    <AceEditor
      mode="sql"
      theme="monokai"
      value={query}
      onChange={(value) => setQuery(value)}
      name="sql-editor"
      editorProps={{ $blockScrolling: true }}
      enableBasicAutocompletion={true}
      enableLiveAutocompletion={true}
      style={aceEditorStyle}
    />
  )
}
