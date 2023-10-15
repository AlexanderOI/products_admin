import styled from 'styled-components'
import { colors } from '../../theme/theme'
import { useFilter } from '../../hooks/useFilter'
import { headerStyle } from '../../style/css.styles'
import { Search } from '../../components/Search'
import { Select } from '../../components/Select'
import { SearchStyle } from '../../style/components-styles'

const FilterArea = styled.div`
  ${headerStyle}

  label {
    padding-left: 15px;
    padding-right: 5px;
  }

  select {
    background-color: ${colors.greyBlue};
    border: 1px solid ${colors.whiteTransparent};
    height: 30px;
    cursor: pointer;

    &:focus {
      outline: none;
      border: 2px solid ${colors.whiteTransparent};
    }
  }
`

const SearchProductsStyle = styled(SearchStyle)`
  height: 30px;
  input {
    width: 150px;
    height: 30px;
  }
`

const SelectArea = styled.div`
  display: flex;
  flex-direction: row;

  select {
    width: 180px;
  }
`

export function Filter({ sectionList, categoryList }: { sectionList: string[], categoryList: string[] }) {
  const {
    filterValues,
    handleSelectChange,
    handleInputChange,
    handleSubmitSearchProducts,
  } = useFilter(sectionList)
  const searchOptionList = ['id', 'name', 'price']

  return (
    <FilterArea>
      <SearchProductsStyle>
        <Search
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleSubmitSearchProducts={handleSubmitSearchProducts}
          searchValues={filterValues}
          searchOptionList={searchOptionList}
        />
      </SearchProductsStyle>


      <SelectArea>
        <Select
          label='Filter by section'
          options={sectionList}
          value={filterValues.section.postUrl}
          onChange={handleSelectChange}
          nameChange='section'
          nameSelect='postUrl'
          id='filterSection'
        />

        <Select
          label='Filter by category'
          options={categoryList}
          value={filterValues.category.postUrl}
          onChange={handleSelectChange}
          nameChange='category'
          nameSelect='postUrl'
          id='filterCategory'
        />
      </SelectArea>
    </FilterArea>
  )

}
