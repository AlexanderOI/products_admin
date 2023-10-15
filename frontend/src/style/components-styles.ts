import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../theme/theme'

export const Container = styled.div`
  display: flex;
`

export const Main = styled.main`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 120px);
`

export const NavLinkStyle = styled(NavLink)`
text-decoration: none;
color: ${colors.whiteTransparent};
`

export const SearchStyle = styled.div`
  display: flex;
  align-items: center;

  input {
    background-color: ${colors.greyBlue};
    border: 1px solid ${colors.whiteTransparent};
    padding-left: 10px;

    &:focus {
      outline: none;
      border: 2px solid ${colors.whiteTransparent};
    }
  }
`