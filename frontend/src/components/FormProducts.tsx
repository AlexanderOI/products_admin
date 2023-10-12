import styled from 'styled-components'
import { colors } from '../theme/theme'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 100%;

  div {
    display: flex;
    justify-content: space-between;
    margin: 15px 0 15px 0; 
    width: 100%;
  }

  label {
    min-width: 20%;
  }

  input {
    background-color: ${colors.greenBlue};
    border: 1px solid ${colors.whiteTransparent};
    min-width: 80%;
    min-height: 30px;
    padding-left: 15px;
  }

  button {
    cursor: pointer;
    padding: 15px;
  }
`

interface FormProductsProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  productData: {
    image: string,
    name: string,
    category: string,
    stock: number,
    price: number,
  }
  buttonText: string
}

export function FormProducts({ handleSubmit, handleInputChange, productData, buttonText }: FormProductsProps) {
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type='text'
          name='name'
          value={productData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type='number'
          name='price'
          value={productData.price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Stock:</label>
        <input
          type='number'
          name='stock'
          value={productData.stock}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Image:</label>
        <input
          type='text'
          name='image'
          value={productData.image}
          onChange={handleInputChange}
        />
      </div>
      <button type='submit'>{buttonText}</button>
    </Form>
  )
}