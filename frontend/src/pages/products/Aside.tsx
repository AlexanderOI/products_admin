import styled from 'styled-components'
import { asideStyle } from '../../style/css.styles'
import { NavLinkStyle } from '../../style/components-styles'
import { useParams } from 'react-router-dom'

const AsideStyle = styled.aside`
  ${asideStyle}

  nav {
    display: flex;
    flex-direction: column;
    padding-top: 15px;
    padding-left: 15px;
    text-indent: 15px;
    line-height: 30px;
  }
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