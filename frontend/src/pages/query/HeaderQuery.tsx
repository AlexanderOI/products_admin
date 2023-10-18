import styled from 'styled-components'
import { headerStyle } from '../../style/css.styles'

const TitlesArea = styled.div`
  ${headerStyle}

  div {
    padding-left: 4%;
  }
`

const TitleMain = styled.div`
  display: flex;
  justify-content: center;
  padding-right: 15%;
  width: 68%;
`

export function HeaderQuery() {
  return (
    <TitlesArea>
      <div>
        <h2>
          Configuration
        </h2>
      </div>

      <TitleMain>
        <h2>
          SQL Editor
        </h2>
      </TitleMain>
    </TitlesArea>
  )
}