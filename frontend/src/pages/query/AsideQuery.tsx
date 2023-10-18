import styled from "styled-components"
import { asideStyle } from "../../style/css.styles"
import { colors } from "../../theme/theme"
import { ButtonSave } from "../../style/components-styles"

const AsideQueryStyle = styled.aside`
  ${asideStyle}

  padding: 0px 15px 15px 15px;
`

const ObjectRightsStyle = styled.div`
  background-color: ${colors.greyBlue};
  padding: 10px 10px 10px 25px;

  div {
    display: flex;
  }

  label {
    padding: 5px 5px 5px 5px;
  }
  
`

const EditorStyle = styled.div`
  position: relative;
  background-color: ${colors.greyBlue};
  padding: 10px 10px 10px 25px;
  margin-top: 32px;

  div {
    display: flex;
    padding: 5px 0px 5px 0px;
    justify-content: space-between;
  }
  
  label {
    padding-right: 5px;
  }

  input {
    width: 60%;
    padding-left: 10px;
    color: #7285f1;
  }
`

const TableElementStyle = styled.div`
  position: relative;
  background-color: ${colors.greyBlue};
  padding: 10px 25px 10px 25px;
  margin-top: 32px;
  height: 180px;

  h3 {
    padding-bottom: 5px;
  }

  textarea {
    min-width: 100%;
    min-height: 80%;
    padding: 10px;
  }
`

const Message = styled.div`
  background-color: ${colors.greyBlue};
  padding: 10px 25px 10px 25px;
  margin-top: 32px;
  height: 180px;
`

type EditorOptionsValuesType = {
  [key: string]: string
}

type AsideQueyProps = {
  objectRights: string[]
  checkboxes: { [key: string]: boolean }
  handleCheckboxChange: (right: string) => void
  productEdit: string
  handleChangeEditCell: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  editorOptionsValues: EditorOptionsValuesType
  handleChangeEditorOptions: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleClickSaveCell: () => void
  message: string
}

export function AsideQuery({
  objectRights,
  checkboxes,
  handleCheckboxChange,
  productEdit,
  handleChangeEditCell,
  editorOptionsValues,
  handleChangeEditorOptions,
  handleClickSaveCell,
  message
}: AsideQueyProps) {
  const editorOptions = ['Background', 'Sidebar color', 'Line color', 'Font size']

  return (
    <AsideQueryStyle>
      <ObjectRightsStyle>
        <h3>Object rights</h3>
        {objectRights.map((right) => (
          <div key={right}>
            <input
              type="checkbox"
              id={right}
              checked={checkboxes[right]}
              onChange={() => handleCheckboxChange(right)}
            />
            <label htmlFor={right}>{right}</label>
          </div>
        ))}
      </ObjectRightsStyle>

      <EditorStyle>
        <form >
          <h3>Editor</h3>
          {editorOptions.map((option) => (
            <div key={option}>
              <label htmlFor={option}>{option}</label>
              <input
                type="text"
                id={option}
                name={option.toLocaleLowerCase().replace(' ', '')}
                value={editorOptionsValues[option.toLocaleLowerCase().replace(' ', '')]}
                onChange={handleChangeEditorOptions}
              />
            </div>
          ))}
        </form>
      </EditorStyle>

      <TableElementStyle>
        <h3>Edit cell</h3>
        <textarea name='product' value={productEdit} onChange={handleChangeEditCell} />
        <ButtonSave onClick={handleClickSaveCell}>Save</ButtonSave>
      </TableElementStyle>

      {message &&
        <Message>{message}</Message>
      }
    </AsideQueryStyle>
  )
}