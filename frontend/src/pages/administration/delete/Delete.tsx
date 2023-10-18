import { Container, SearchStyle } from '../../../style/components-styles'
import { Main } from '../../../style/components-styles'
import { AsideAdministration } from '../AsideAdministration'
import { HeaderTitles } from '../HeaderTitles'
import styled from 'styled-components'
import { colors } from '../../../theme/theme'
import { useState } from 'react'
import { FormProducts } from '../../../components/FormProducts'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { AsideDelete } from './AsideDelete'
import { Search } from '../../../components/Search'
import { DELETE_PRODUCTS, PRODUCTS_JSON, PRUDUCT_PRE_URL } from '../../../constants/endpoint'
import { ProductsType } from '../../../types.'


const RenderJson = styled.div`
  position: relative;
  background-color: #1a1a1a;
  border: 2px solid ${colors.blueDeep};
  padding: 15px;
  margin: 20px;
  width: 50%;

  div {
    height: 100%;
  }

  pre {
    height: 100%;
  }
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;

  p {
    background-color: ${colors.greenBlue};
    text-align: center;
    line-height: 25px;
    border-radius: 3px;
    border-bottom: 2px solid ${colors.blueDeep};
    margin: 15px;
    width: 80%;
  }
`

const SearchProductsStyle = styled(SearchStyle)`
  padding: 15px;
  width: 100%;

  form {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  label {
    height: 30px;
  }

  input {
    width: 80%;
    height: 30px;
  }
`

export function Delete() {
  const [productsInsertJson, setProductsInsertJson] = useState<ProductsType>({
    product_id: 6,
    sub_category: '',
    category_id: '',
    product: '',
    alt: '',
    price: 0,
    stock: 0,
    quantity: 0,
    img: ''
  })

  const [message, setMessage] = useState('')
  const [deleteValues, setDeleteValues] = useState({
    search: { preUrl: 'id', postUrl: '' },
  })

  const handleInputChange = () => {
    return
  }

  const handleFocus = () => {
    setMessage('cannot modify the form')
  }

  const handleBlur = () => {
    setMessage('')
  }

  const handleSubmitSearchProducts = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const url = `${PRODUCTS_JSON}${PRUDUCT_PRE_URL}${deleteValues.search.preUrl}=${deleteValues.search.postUrl}`

    try {
      const response = await fetch(url)
      const data: ProductsType[] = await response.json()
      if (data[0]) {
        setProductsInsertJson(data[0])
        setMessage('')
      } else {
        setMessage('The searched product does not exist')
      }
    } catch (error) {
      setMessage('There was an error searching for the product, please try again')
    }
  }

  const handleInputChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value } = event.target

    setMessage('')

    if (isNaN(Number(value))) return

    setDeleteValues((prevDeleteValues) => ({
      ...prevDeleteValues,
      [type]: { ...prevDeleteValues.search, [name]: value }
    }))
  }

  const handleSubmitDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await fetch(`${DELETE_PRODUCTS}`, {
        method: 'POST',
        body: JSON.stringify(deleteValues.search),
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.ok) {
        const data = await response.json()
        setMessage(data.message)
      } else {
        const errorData = await response.json()
        setMessage(errorData.message)
      }
    } catch (error) {
      setMessage('An error occurred while deleting the product, please try again')
    }
  }

  const deleteProductsData = {
    section: '',
    image: productsInsertJson.img,
    name: productsInsertJson.product,
    category: '',
    subCategory: '',
    stock: productsInsertJson.stock,
    price: productsInsertJson.price
  }

  return (
    <>
      <HeaderTitles />
      <Container>
        <AsideAdministration>
          <AsideDelete
            category={productsInsertJson.category_id}
            subCategory={productsInsertJson.sub_category}
          />
        </AsideAdministration>

        <Main>

          <Form>
            <SearchProductsStyle>
              <Search
                handleSubmitSearchProducts={handleSubmitSearchProducts}
                handleInputChange={handleInputChangeSearch}
                searchValues={deleteValues}
              />
            </SearchProductsStyle>

            <FormProducts
              handleSubmit={handleSubmitDelete}
              handleInputChange={handleInputChange}
              productData={deleteProductsData}
              buttonText={'Delete Product'}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {message && <p>{message}</p>}

          </Form>
          <RenderJson>
            <div>
              <SyntaxHighlighter
                language='json'
                style={atomOneDark}
                customStyle={{ background: '#1a1a1a' }}
              >
                {JSON.stringify(productsInsertJson, null, 2)}
              </SyntaxHighlighter>
            </div>

          </RenderJson>
        </Main>

      </Container>
    </>
  )
}