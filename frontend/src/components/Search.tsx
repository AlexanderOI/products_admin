import styled from 'styled-components'
import { colors } from '../theme/theme'
import { Select } from './Select'

const SearchStyle = styled.div`
  display: flex;
  align-items: center;
  height: 30px;

  input {
    background-color: ${colors.greyBlue};
    border: 1px solid ${colors.whiteTransparent};
    width: 150px;
    height: 30px;
    padding-left: 10px;

    &:focus {
      outline: none;
      border: 2px solid ${colors.whiteTransparent};
    }
  }
`

type FilterValues = {
  [key: string]: { preUrl: string, postUrl: string }
}

interface SearchProps {
  handleSubmitSearchProducts: (e: React.ChangeEvent<HTMLFormElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>, type: string) => void
  filterValues: FilterValues
}

export function Search({ handleSubmitSearchProducts, handleInputChange, handleSelectChange, filterValues }: SearchProps) {
  const searchOptionList = ['id', 'name', 'price']
  return (
    <SearchStyle>
      <label htmlFor='search'>Search</label>
      <form onSubmit={handleSubmitSearchProducts}>
        <input
          onChange={handleInputChange}
          value={filterValues.search.postUrl}
          type='search'
          name='postUrl'
          id='search'
        />
      </form>
      <Select
        options={searchOptionList}
        value={filterValues.search.preUrl}
        onChange={handleSelectChange}
        nameChange='search'
        nameSelect='preUrl'
        id='searchSelect'
      />
    </SearchStyle>
  )
}