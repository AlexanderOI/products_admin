import styled from "styled-components"

import { NavLink, useParams } from "react-router-dom"
import { colors } from '../theme/theme'

const AsideStyle = styled.aside`
  display: flex;
  flex-direction: column;
  width: 20%;
  min-width: 300px;
  min-height: 100%;
  background-color: ${colors.greenBlue};

  nav {
    display: flex;
    flex-direction: column;
    padding-top: 15px;
    padding-left: 15px;
    text-indent: 15px;
    line-height: 30px;
  }
`

const NavLinkStyle = styled(NavLink)`
  text-decoration: none;
  color: ${colors.whiteTransparent};
`

export function Aside({ categoryList, subCategoryList }: { categoryList: string[], subCategoryList: string[] }) {
  const { section, category } = useParams()

  return (
    <AsideStyle>
      <nav>
        {subCategoryList.map((subCategory) => (
          <NavLinkStyle key={subCategory} to={`/products/${section}/${category || categoryList[0]}/${subCategory}`}>
            {subCategory.replace(/-/g, ' ')}
          </NavLinkStyle>
        ))}
      </nav>
    </AsideStyle>
  )
}