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
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  productData: {
    image: string
    name: string
    category_id: string
    stock: number
    price: number
  }
  buttonText: string
}

export function FormProducts({ handleSubmit, handleInputChange, onFocus, onBlur, productData, buttonText }: FormProductsProps) {
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type='text'
          name='name'
          autoComplete="off"
          value={productData.name}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type='number'
          name='price'
          autoComplete="off"
          value={productData.price}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <div>
        <label>Stock:</label>
        <input
          type='number'
          name='stock'
          autoComplete="off"
          value={productData.stock}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <div>
        <label>Image:</label>
        <input
          type='text'
          name='image'
          autoComplete="off"
          value={productData.image}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <button type='submit'>{buttonText}</button>
    </Form>
  )
}