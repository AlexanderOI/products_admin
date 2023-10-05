import styled from "styled-components"

import { NavLink, useParams } from "react-router-dom"
import { colors } from '../theme/theme'
import { useEffect, useState } from "react"
import { SUB_CATEGORY_LIST } from "../constants/endpoint"

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

export function Aside() {
  const [subCategoryList, setSubCategoryList] = useState<string[]>([])

  const { section, category } = useParams()

  useEffect(() => {
    async function fetchCategoryList() {
      try {
        const response = await fetch(SUB_CATEGORY_LIST + category)
        const data = await response.json()
        setSubCategoryList(data)
      } catch (error) {
        console.log('Error Get Category List: ', error)
      }
    }

    fetchCategoryList()
  }, [category])

  return (
    <AsideStyle>
      <nav>
        {subCategoryList.map((subCategory) => (
          <NavLinkStyle key={subCategory} to={`/products/${section}/${category}/${subCategory}`}>
            {subCategory.replace(/-/g, ' ')}
          </NavLinkStyle>
        ))}
      </nav>
    </AsideStyle>
  )
}