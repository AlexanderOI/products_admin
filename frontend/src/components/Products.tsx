import { useState, useEffect } from "react"
import styled from "styled-components"
import { Filter } from "./Filter"
import { Aside } from "./Aside"
import { colors } from '../theme/theme'
import { CATEGORY_LIST, PRODUCTS_JSON, PRUDUCT_PRE_URL, SECTION_LIST, SECTION_PRE_URL, SUB_CATEGORY_LIST } from "../constants/endpoint"
import { NavLink, useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"

interface DivProps {
  $width?: string
}

const Main = styled.main`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 120px);
`

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 100%;
  min-height: 100%;
  padding: 15px; 

  li {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  img {
    width: 40px;
  }
`

const Table = styled.div<DivProps>`
  padding-left: 15px;
  width: ${(props) => props.$width};
  border: 1px solid ${colors.greenBlue};
`

const TableHeader = styled.div<DivProps>`
  padding-left: 15px;
  width: ${(props) => props.$width};
  background-color: ${colors.greenBlue};
  margin-bottom: 5px;
  border: 1px solid ${colors.greyBlue};
  border-radius: 3px;
`

type ProductsType = {
  product_id: number,
  sub_category: string
  category_id: string
  product: string
  alt: string
  price: number,
  stock: number,
  quantity: number,
  img: string
}

const NavLinkStyle = styled(NavLink)`
  margin: 10px auto;
  text-decoration: none;
  padding: 5px 15px 5px 15px;
  border-radius: 5px;
  color: ${colors.whiteTransparent};
  background-color: ${colors.greenBlue};

  &:hover{
    background-color: #606c75de;
  }
`

export function Products() {
  const [products, setProducts] = useState<ProductsType[]>([])
  const { section, category, subCategory, page, search, searchQuery } = useParams()
  const currentPage = parseInt(page ?? '1')

  const sectionListUrl = SECTION_LIST
  const { data: sectionList } = useFetch(sectionListUrl)
  const categoryListUrl = CATEGORY_LIST + (section || sectionList[0])
  const { data: categoryList } = useFetch(categoryListUrl)
  const subCategoryListUrl = SUB_CATEGORY_LIST + (category || categoryList[0])
  const { data: subCategoryList } = useFetch(subCategoryListUrl)

  useEffect(() => {
    const getProducts = async () => {
      let productsUrl = PRODUCTS_JSON + PRUDUCT_PRE_URL

      if (search && searchQuery) {
        productsUrl = `${PRODUCTS_JSON}${PRUDUCT_PRE_URL}${search}=${searchQuery}`
      } else if (subCategory) {
        productsUrl = `${PRODUCTS_JSON}${PRUDUCT_PRE_URL}sub-category=${subCategory}`
        console.log(subCategory)
      } else if (category) {
        productsUrl = `${PRODUCTS_JSON}${PRUDUCT_PRE_URL}category=${category}`
      } else if (section) {
        productsUrl = `${PRODUCTS_JSON}${SECTION_PRE_URL}section=${section}`
      }

      try {
        const response = await fetch(productsUrl)
        const data: ProductsType[] = await response.json()
        setProducts(data)
      } catch (error) {
        console.log('Error Get Products: ', error)
      }
    }

    getProducts()
  }, [section, category, subCategory, search, searchQuery])

  function getNextPageLink() {
    let nextPageLink = '/products';

    if (section) {
      nextPageLink += `/${section}`;
      if (category) {
        nextPageLink += `/${category ?? categoryList[0]}`;
        if (subCategory) {
          nextPageLink += `/${subCategory ?? subCategoryList[0]}`;
        }
      }
    }

    nextPageLink += `/page/${currentPage + 1}`;
    return nextPageLink;
  }

  return (
    <>
      <Filter sectionList={sectionList} categoryList={categoryList} />
      <Main>
        <Aside categoryList={categoryList} subCategoryList={subCategoryList} />
        <Ul>
          <li>
            <TableHeader $width="20%">
              <p>Image</p>
            </TableHeader>
            <TableHeader $width="25%">
              <p>ID</p>
            </TableHeader>
            <TableHeader $width="100%">
              <p>Product</p>
            </TableHeader>
            <TableHeader $width="30%">
              <p>Category</p>
            </TableHeader>
            <TableHeader $width="15%">
              <p>Stock</p>
            </TableHeader>
            <TableHeader $width="25%">
              <p>Price</p>
            </TableHeader>
          </li>

          {products.slice(0, 20 * currentPage).map(product => (
            <li key={product.product_id}>
              <Table $width="20%">
                <img src={product.img} alt={product.alt} />
              </Table>
              <Table $width="25%">
                <p>{product.product_id}</p>
              </Table>
              <Table $width="100%">
                <p>{product.product}</p>
              </Table>
              <Table $width="30%">
                <p>{product.sub_category}</p>
              </Table>
              <Table $width="15%">
                <p>{product.stock}</p>
              </Table>
              <Table $width="25%">
                <p>{product.price}</p>
              </Table>
            </li>
          ))}
          {search != 'id' && products.length > 20 && (products.length > currentPage * 20) &&
            <NavLinkStyle to={getNextPageLink()}>
              Show more product
            </NavLinkStyle>
          }
        </Ul>
      </Main>
    </>
  );
}
