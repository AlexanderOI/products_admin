import { Container } from '../../../style/components-styles'
import { Main } from '../../../style/components-styles'
import { AsideAdministration } from '../AsideAdministration'
import { HeaderTitles } from '../HeaderTitles'
import { AsideInsert } from './AsideInsert'
import styled from 'styled-components'
import { colors } from '../../../theme/theme'
import { useEffect, useState } from 'react'
import { FormProducts } from '../../../components/FormProducts'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useSelectInsert } from '../../../context/SelectInsertProvider'
import { INSERT_PRODUCTS } from '../../../constants/endpoint'


const RenderJson = styled.div`
  position: relative;
  background-color: #1a1a1a;
  border: 2px solid ${colors.blueDeep};
  padding: 15px;
  margin: 20px;
  width: 50%;

  button {
    position: absolute;
    margin: 15px;
    bottom: 0;
    right: 0;
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

type Products = {
  sub_category: string
  category: string
  product: string
  alt: string
  price: number
  stock: number
  quantity: number
  img: string
}

type ProductsInsertJson = {
  [key: string]: Products
}

export function Insert() {
  const { selectInsertValues, setSelectInsertValues } = useSelectInsert()

  const dynamicKey = selectInsertValues.section
  const [productsInsertJson, setProductsInsertJson] = useState<ProductsInsertJson>({
    [dynamicKey]: {
      sub_category: '',
      category: '',
      product: '',
      alt: '',
      price: 0,
      stock: 0,
      quantity: 0,
      img: ''
    }
  })

  const [message, setMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSelectInsertValues((prevSelectInsertValues) => ({
      ...prevSelectInsertValues,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const insertData = productsInsertJson[dynamicKey]
    try {
      const response = await fetch(INSERT_PRODUCTS, {
        method: 'POST',
        body: JSON.stringify(insertData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setMessage('Product saved successfully in the database')
      } else {
        const errorData = await response.json()
        setMessage(errorData.message || 'Error submitting the form, please try again')
      }

    } catch (error) {
      setMessage('Error submitting the form, please try again')
    }


    setProductsInsertJson({
      [dynamicKey]: {
        sub_category: '',
        category: '',
        product: '',
        alt: '',
        price: 0,
        stock: 0,
        quantity: 0,
        img: ''
      }
    })

    setSelectInsertValues((prevSelectInsertValues) => ({
      ...prevSelectInsertValues,
      image: '',
      name: '',
      stock: 0,
      price: 0
    }))
  }

  useEffect(() => {
    const dynamicKey = selectInsertValues.section

    setProductsInsertJson({
      [dynamicKey]: {
        sub_category: selectInsertValues.subCategory,
        category: selectInsertValues.category,
        product: selectInsertValues.name.toUpperCase(),
        alt: 'Foto ' + selectInsertValues.name.toUpperCase(),
        price: parseFloat(selectInsertValues.price.toString()) || 0,
        stock: parseInt(selectInsertValues.stock.toString()) || 0,
        quantity: 0,
        img: selectInsertValues.image
      }
    })
  }, [selectInsertValues])

  return (
    <>
      <HeaderTitles />
      <Container>
        <AsideAdministration>
          <AsideInsert />
        </AsideAdministration>

        <Main>
          <Form>
            <FormProducts
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              productData={selectInsertValues}
              buttonText={'Save Product'}
            />
            {message && <p>{message}</p>}

          </Form>
          <RenderJson>
            <div>
              <SyntaxHighlighter language='json' style={atomOneDark} customStyle={{ background: '#1a1a1a' }}>
                {JSON.stringify(productsInsertJson, null, 2)}
              </SyntaxHighlighter>
            </div>

          </RenderJson>
        </Main>

      </Container>
    </>
  )
}