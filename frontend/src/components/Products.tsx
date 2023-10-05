import { useState, useEffect } from "react"
import styled from "styled-components"
import { Filter } from "./Filter"
import { Aside } from "./Aside"
import { colors } from '../theme/theme'
import { PRODUCTS_JSON, PRUDUCT_PRE_URL, SECTION_PRE_URL } from "../constants/endpoint"
import { NavLink, useParams } from "react-router-dom"

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



  useEffect(() => {
    const getProducts = async () => {

      let URL_PRODUCTS = PRODUCTS_JSON + PRUDUCT_PRE_URL

      if (search && searchQuery) {
        URL_PRODUCTS = `${PRODUCTS_JSON}${PRUDUCT_PRE_URL}${search}=${searchQuery}`
      } else if (subCategory) {
        URL_PRODUCTS = `${PRODUCTS_JSON}${PRUDUCT_PRE_URL}sub-category=${subCategory}`
        console.log(subCategory)
      } else if (category) {
        URL_PRODUCTS = `${PRODUCTS_JSON}${PRUDUCT_PRE_URL}category=${category}`
      } else if (section) {
        URL_PRODUCTS = `${PRODUCTS_JSON}${SECTION_PRE_URL}section=${section}`
      }

      try {
        const response = await fetch(URL_PRODUCTS)
        const data: ProductsType[] = await response.json()
        setProducts(data)
      } catch (error) {
        console.log('Error Get Products: ', error)
      }
    }

    getProducts()
  }, [section, category, subCategory, search, searchQuery])

  return (
    <>
      <Filter />
      <Main>
        <Aside />
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

          {products.slice(0, 20 * parseInt(page ?? '1')).map(product => (
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
          <NavLinkStyle to={`/products/${section}/${category}/${subCategory}/${parseInt(page ?? '1') + 1}`}>
            Show more product
          </NavLinkStyle>
        </Ul>
      </Main>
    </>
  );
}
