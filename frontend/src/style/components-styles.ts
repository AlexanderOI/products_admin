import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../theme/theme'

export const Container = styled.div`
  display: flex;
`

export const Main = styled.main`
  display: flex;
  width: 80%;
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

export const ButtonSave = styled.button`
  position: absolute;
  background-color: ${colors.greenBlue};
  border: none;
  top: 0;
  right: 0;
  padding: 3px 5px 3px 5px;
  margin: 10px;
  cursor: pointer;

  &:hover{
    opacity: 0.5;
  }
`
