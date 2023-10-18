import { Container, Main } from '../../style/components-styles'
import { AsideQuery } from './AsideQuery'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { colors } from '../../theme/theme'
import { QUERY_PRODUCTS, UPDATE_PRODUCTS } from '../../constants/endpoint'
import { Table } from './Table'
import { HeaderQuery } from './HeaderQuery'
import { Editor } from './Editor'

const SQLEditor = styled.div`
  width: 99%;
`

const BarEditorVertical = styled.div`
  background-color: ${colors.greenBlue};
  width: 1%;
  height: 100%;
`

const BarDitorHorizontal = styled.div`
    width: 100%;
    height: 10px;
    background-color: ${colors.greenBlue};
`

type ResultsQuery = {
  headers: string[]
  content: string[][]
}

type EditorOptionsValuesType = {
  [key: string]: string
}

type CheckRightType = {
  [key: string]: boolean
}

export function Query() {
  const objectRights = ['SELECT', 'CREATE', 'INSERT', 'UPDATE', 'DELETE']
  const initialCheckboxState: CheckRightType = {}
  objectRights.forEach((right) => {
    initialCheckboxState[right] = false
  })

  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')
  const [checkboxes, setCheckboxes] = useState(initialCheckboxState)

  const queryRef = useRef(query)
  const checkboxesRef = useRef(checkboxes)

  const [resultsQuery, setResultsQuery] = useState<ResultsQuery>({ headers: [''], content: [['']] })
  const [selectedCell, setSelectedCell] = useState({ row: -1, column: -1, product: '' })

  const [editorOptionsValues, setEditorOptionsValues] = useState<EditorOptionsValuesType>({
    background: '',
    sidebarcolor: '',
    linecolor: '',
    fontsize: ''
  })

  useEffect(() => {
    queryRef.current = query
  }, [query])

  useEffect(() => {
    checkboxesRef.current = checkboxes
  }, [checkboxes])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => { window.removeEventListener('keydown', handleKeyPress) }
  }, [])

  const handleKeyPress = useCallback(async (event: { ctrlKey: any; key: string }) => {
    if (event.ctrlKey && event.key === 'Enter') {
      const currentQuery = queryRef.current
      const checkboxesCurrent = checkboxesRef.current

      const response = await fetch(QUERY_PRODUCTS, {
        method: 'POST',
        body: JSON.stringify({ query: currentQuery, rigth: checkboxesCurrent }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.ok) {
        const data: ResultsQuery = await response.json()
        setResultsQuery(data)
      }
    }
  }, [queryRef, checkboxesRef, setResultsQuery])

  const handleClickSaveCell = async () => {
    const response = await fetch(UPDATE_PRODUCTS, {
      method: 'PATCH',
      body: JSON.stringify(resultsQuery.content[selectedCell.row]),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      const data = await response.json()
      setMessage(data.message)
    }
  }

  const handleChangeEditCell = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    if (!selectedCell.product) return

    setSelectedCell((prev) => ({
      ...prev,
      [name]: value
    }))

    setResultsQuery((prevResults) => {
      if (selectedCell.column == 0) return prevResults
      const newContent = prevResults.content.slice()
      newContent[selectedCell.row][selectedCell.column] = value
      return { ...prevResults, content: newContent }
    })
  }

  const handleChangeEditorOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setEditorOptionsValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (right: string) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [right]: !prevCheckboxes[right],
    }))
  }

  return (
    <>
      <HeaderQuery />
      <Container>
        <AsideQuery
          objectRights={objectRights}
          checkboxes={checkboxes}
          handleCheckboxChange={handleCheckboxChange}
          productEdit={selectedCell.product}
          handleChangeEditCell={handleChangeEditCell}
          editorOptionsValues={editorOptionsValues}
          handleChangeEditorOptions={handleChangeEditorOptions}
          handleClickSaveCell={handleClickSaveCell}
          message={message}
        />

        <Main>
          <SQLEditor>
            <Editor
              editorOptionsValues={editorOptionsValues}
              query={query}
              setQuery={setQuery}
            />

            <BarDitorHorizontal></BarDitorHorizontal>
            <Table
              resultsQuery={resultsQuery}
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
            />

          </SQLEditor>
          <BarEditorVertical></BarEditorVertical>
        </Main>
      </Container>

    </>
  )
}