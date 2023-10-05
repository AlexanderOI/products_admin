import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/logo-products-api.png'
import { colors } from '../theme/theme'

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.greyBlue};
  width: 100%;
  height: 60px;

  img {
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }

  div {
    display: flex;
    padding-left: 20px;
  }

  nav {
    display: flex;
    justify-content: space-between;
    width: 60%;
    padding-right: 20px;
  }
`
const NavLinkStyle = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  background-color: ${colors.greenBlue};
  color: ${colors.whiteTransparent};
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  width: 150px;
  height: 30px;
  padding: 0px 18px 0px 18px;
  
  &.active {
    border-bottom: 5px solid ${colors.blueDeep};
    box-sizing: border-box;
  }
`

export function Header() {
  return (
    <HeaderStyle>
      <div>
        <img src={logo} alt="Product management app logo" />
        <h2>Products Admin</h2>
      </div>
      <nav>
        <NavLinkStyle to={'/products'}>view products</NavLinkStyle>
        <NavLinkStyle to={'/insert'}>Insert</NavLinkStyle>
        <NavLinkStyle to={'/delete'}>Delete</NavLinkStyle>
        <NavLinkStyle to={'/query'}>SQL queries</NavLinkStyle>
      </nav>
    </HeaderStyle>
  )
}