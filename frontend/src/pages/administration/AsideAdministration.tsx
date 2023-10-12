import styled from 'styled-components'
import { asideStyle } from '../../style/css.styles'
import { NavLinkStyle } from '../../style/components-styles'
import { colors } from '../../theme/theme'

const AsideStyle = styled.aside`
padding: 15px;
  ${asideStyle}
`

const NavLinkAdministration = styled(NavLinkStyle)`
  display: flex;
  justify-content: center;
  line-height: 30px;
  background-color: ${colors.greyBlue};
  border-radius: 5px;
  width: 100%;
  height: 30px;
  margin: 5px;

  &.active{
    border-bottom: 3px solid ${colors.blueDeep};
  }
`

export function AsideAdministration({ children }: { children: React.ReactNode }) {
  return (
    <AsideStyle>
      <NavLinkAdministration to={'/administration/insert'}>Insert</NavLinkAdministration>
      <NavLinkAdministration to={'/administration/delete'}>Detele</NavLinkAdministration>
      {children}
    </AsideStyle>
  )
}