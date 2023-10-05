import styled from 'styled-components'
import { colors } from '../theme/theme'
import { useFilter } from '../hooks/useFilter'

const FilterArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.greenBlue};
  padding: 15px;
  width: 100%;
  height: 60px;

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

const Search = styled.div`
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

const Select = styled.div`
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

  return (
    <FilterArea>
      <Search>
        <label htmlFor="search">Search</label>
        <form onSubmit={handleSubmitSearchProducts}>
          <input
            onChange={handleInputChange}
            value={filterValues.search.postUrl}
            type="search"
            name="postUrl"
            id="search"
          />
        </form>
        <select
          onChange={(e) => handleSelectChange(e, 'search')}
          value={filterValues.search.preUrl}
          name="preUrl"
          id="searchSelect"
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </Search>
      <Select>
        <div>
          <label htmlFor="filterSection">Filter by section</label>
          <select
            onChange={(e) => handleSelectChange(e, 'section')}
            value={filterValues.section.postUrl}
            name="postUrl"
            id="filterSection"
          >
            {sectionList.map((sectionItem) => (
              <option key={sectionItem} value={sectionItem}>
                {sectionItem.replace(/-/g, ' ')}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filterCategory">Filter by category</label>
          <select
            onChange={(e) => handleSelectChange(e, 'category')}
            value={filterValues.category.postUrl}
            name="postUrl"
            id="filterCategory"
          >
            {categoryList.map((categoryItem) => (
              <option key={categoryItem} value={categoryItem}>
                {categoryItem.replace(/-/g, ' ')}
              </option>
            ))}
          </select>
        </div>
      </Select>
    </FilterArea>
  )

}
