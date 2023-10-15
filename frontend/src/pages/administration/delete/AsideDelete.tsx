import styled from 'styled-components'
import { asideAdministrationStyle } from '../../../style/css.styles'
import { colors } from '../../../theme/theme'


const InfoAreaDiv = styled.div`
  ${asideAdministrationStyle}

  span {
    padding: 5px;
  }

  p {
    text-align: center;
    background-color: ${colors.greenBlue};
    border-radius: 3px;
    border: 1px solid ${colors.whiteTransparent};
    width: 80%;
    height: 25px;
  }
`

type AsideDeleteProps = {
  category: string
  subCategory: string
}

export function AsideDelete({ category, subCategory }: AsideDeleteProps) {

  return (
    <div>
      <InfoAreaDiv>
        <span>Category: </span>
        <p>{category}</p>
      </InfoAreaDiv>
      <InfoAreaDiv>
        <span>Subcategory: </span>
        <p>{subCategory}</p>
      </InfoAreaDiv>
    </div>
  )
}