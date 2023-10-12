import styled from 'styled-components'
import { headerStyle } from '../../style/css.styles'

const TitlesArea = styled.div`
  ${headerStyle}

  div {
    padding-left: 2%;
  }
`

const TitleMain = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 15%;
  width: 68%;
`

export function HeaderTitles() {
  return (
    <TitlesArea>
      <div>
        <h2>
          Manage products
        </h2>
      </div>

      <TitleMain>
        <h2>
          Product form
        </h2>
        <h2>
          JSON format
        </h2>
      </TitleMain>
    </TitlesArea>
  )
}