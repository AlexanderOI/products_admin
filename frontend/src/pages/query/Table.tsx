import { memo } from "react"
import styled from "styled-components"
import { colors } from "../../theme/theme"

const TableContainer = styled.div`
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: auto;
`
const TableStyled = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  position: relative;
  width: 100%;

  thead {
    position: sticky;
    top: 0;
    border: 1px solid #ccc;
    background-color: ${colors.greenBlue};
  }

  th{
    border: 1px solid #ccc;
    font-size: 0.8em;
    padding: 8px;
    text-align: left;
  }

  td{
    border: 1px solid #ccc;
    font-size: 0.8em;
    padding: 5px 8px 5px 8px;
    text-align: left;
    max-height: 2em;
    overflow: hidden;
    white-space: nowrap;
    max-width: 350px;
    text-overflow: ellipsis;
    cursor: pointer;
  }
`

type ResultsQuery = {
  resultsQuery: { headers: string[]; content: string[][] } | undefined
  selectedCell: {
    row: number
    column: number
    product: string
  }
  setSelectedCell: React.Dispatch<React.SetStateAction<{ row: number; column: number; product: string; }>>
}

export const Table = memo(function Table({ resultsQuery, selectedCell, setSelectedCell }: ResultsQuery) {


  const handleCellClick = (row: number, column: number, product: string) => {

    setSelectedCell({ row, column, product })
  }

  return (
    <TableContainer>
      <div></div>
      {resultsQuery?.content &&
        <TableStyled >
          <thead>
            <tr>
              {resultsQuery.headers.map((header) => (
                <th key={header}>{header}</th>
              ))}

            </tr>
          </thead>
          <tbody>
            {resultsQuery.content.slice(0, 28).map((content, rowIndex) => (
              <tr key={rowIndex}>
                {content.map((product, columnIndex) => (
                  <td key={product}
                    onClick={() => handleCellClick(rowIndex, columnIndex, product)}
                    style={{
                      backgroundColor:
                        rowIndex === selectedCell.row &&
                          columnIndex === selectedCell.column
                          ? colors.blueDeep
                          : colors.greyBlue,
                    }}>{product}</td>
                ))}
              </tr>
            ))}

          </tbody>
        </TableStyled>
      }
    </TableContainer>
  )
})